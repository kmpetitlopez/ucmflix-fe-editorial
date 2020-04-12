import api from './api'
import _ from 'lodash'
import moment from 'moment'

export default {
    getImageUrl(id){
        return 'http://localhost:3000/static/images/' + id + '.jpg';
    },

    getStatus(startDate, endDate){
        const currentDate = moment.utc(),
            isFuture = startDate && moment.utc(endDate).isAfter(currentDate),
            isActive = startDate && moment.utc(startDate).isSameOrBefore(currentDate) &&
                (endDate === null || moment.utc(endDate).isAfter(currentDate));
        let status = isFuture ? 'programmed' : null;

        if (!status) {
            status = isActive ? 'active' : 'expired';
        }
        
        return status;
    },
    
    formatDate(date){
        return date && moment.utc(date).format('YYYY/MM/DD');
    },

    getCotentStatus(vodEvents = []){
        let status = 'expired';
        let isProgrammed = false;
        
        for(const vodEvent of vodEvents) {
            status = this.getStatus(vodEvent.windowStartTime, vodEvent.windowEndTime);

            if (status === 'active') {
                break;
            } 
            
            if (status === 'programmed') {
                isProgrammed = true;
            }
        }

        if (status !== 'active' && isProgrammed) {
            status = 'programmed';
        }

        return status;
    },

    async completeContentInfo(contents = []){
        for(const content of contents) {
            content.vodEvents = (await api.getContentVodEvents(content.id)).items;
            content.imageUrl = this.getImageUrl(content.id);
            content.defaultImage = 'http://localhost:3000/static/images/default.jpg'
            content.hover = false;
            content.status = this.getCotentStatus(content.vodEvents);
        }
        
        return contents;
    },

    async getHomeScreenInfo() {
        const categories = (await api.getCategories()).items;

        for (const category of categories) {
            const categoryReferences = (await api.getCategoryContents(
                    category.id
                )).items,
                contents = categoryReferences.map((categoryReference) => categoryReference.content);

            category.contents = await this.completeContentInfo(contents);
            category.status = this.getStatus(category.startDate, category.endDate);
            category.startDate = this.formatDate(category.startDate);
            category.endDate = this.formatDate(category.endDate);
        }

        return categories
    },

    async getContentWithoutCategories() {
        const contents = (await api.getContentWithoutCategories()).items;
        
        return this.completeContentInfo(contents);
    },

    async getSectionScreenInfo(id) {
        const category = await api.getCategory(id),
            categoryReferences = (await api.getCategoryContents(
                id
            )).items,
            contents = categoryReferences.map((categoryReference) => {
                const resp = categoryReference.content;
                resp.categoryReferenceId = true;
                return resp;
            });

        category.contents = await this.completeContentInfo(contents);
        category.status = this.getStatus(category.startDate, category.endDate);
        category.startDate = this.formatDate(category.startDate);
        category.endDate = this.formatDate(category.endDate);

        return category;
    },

    async getDetailScreenInfo(id) {
        const content = await api.getContent(id),
            tmpContent = await this.completeContentInfo([content]);
        return tmpContent[0];
    },

    async searchContent(title) {
        const contents = (await api.getContents([{title}])).items;

        return this.completeContentInfo(contents);
    },

    async searchCategory(name) {
        const categories = (await api.getCategories({name})).items;

        for (const category of categories) {
            category.status = this.getStatus(category.startDate, category.endDate);
            category.startDate = this.formatDate(category.startDate);
            category.endDate = this.formatDate(category.endDate);
        }

        return categories;
    },

    async getMasterSeasons(id) {
        const response = [],
            seasons = (await api.getContentSeasons(id)).items;

        for (const season of seasons) {
            const episodes = await this.getSeasonEpisodes(id, season.seasonNumber);

            response.push({
                seasonNumber: season.seasonNumber,
                episodes
            });
        }

        return response;
    },

    async getSeasonEpisodes(id, seasonNumber) {
        const contents = (await api.getContentEpisodes(id, {seasonNumber})).items;

        return await this.completeContentInfo(contents);
    },

    async saveCategory(category) {
        const clonedCategory = _.cloneDeep(category),
            promises = [];
        let newCategory = {};
        
        if (clonedCategory) {
            let categoryReferences = [];
            delete clonedCategory.contents;

            clonedCategory.startDate = moment.utc(clonedCategory.startDate).startOf('day');
            clonedCategory.endDate = clonedCategory.endDate ?
                moment.utc(clonedCategory.endDate).endOf('day') : null;

            if (clonedCategory.id) {
                newCategory = await api.updateCategory(clonedCategory.id, clonedCategory);
                categoryReferences = (await api.getCategoryReferences({
                    categoryId: clonedCategory.id
                })).items;
            } else {
                newCategory = await api.createCategory(clonedCategory);
            }

            for (const reference of categoryReferences) {
                const isInContents = category.contents.find((content) => {
                        return reference.contentId === content.id;
                    })

                if (!isInContents) {
                    promises.push(api.deleteCategoryReference({
                        categoryId: clonedCategory.id,
                        contentId: reference.contentId
                    }));
                }
            }

            for (const content of category.contents) {
                if (content && !content.categoryReferenceId) {
                    promises.push(api.createCategoryReference({
                        categoryId: newCategory.id,
                        contentId: content.id
                    }));
                }
            }

            await Promise.all(promises);
        }

        return newCategory;
    },

    async deleteCategory(category) {
        if (category && category.id) {
            await api.deleteCategory(category.id);
        }
    },

    async getContentVodEvents(id) {
        const vodEvents = (await api.getContentVodEvents(id)).items;

        for (const vodEvent  of vodEvents) {
            vodEvent.selected = false;
            vodEvent.editable = false;
            vodEvent.status = this.getStatus(vodEvent.windowStartTime, vodEvent.windowEndTime);
            vodEvent.windowStartTime = this.formatDate(vodEvent.windowStartTime);
            vodEvent.windowEndTime = this.formatDate(vodEvent.windowEndTime);
            vodEvent.name = 'tmp' + vodEvent.id;
        }

        return vodEvents;
    },

    filter (filtersDeactivated, filters, filteredItems = [], items = []) {        
        if (filtersDeactivated) {
            filteredItems = items;
        } else {
            let programmed = [],
                active = [],
                originalItems = items;
            
            if (filters.programmed) {
                programmed = items.filter((category) => {
                    return category.status === 'programmed';
                });
            }

            if (filters.active) {
                active = items.filter((category) => {
                    return category.status === 'active';
                });
            }

            if (filters.programmed || filters.active) {
                filteredItems = active.concat(programmed);
                originalItems = filteredItems;
            }

            if (filters.select) {
                filteredItems = originalItems.filter((category) => {
                    return category.selected;
                });
            } 
        }

        return filteredItems;
    },

    createVodEvents (vodEvents, contentId) {
        return vodEvents.filter((vodEvent) => {
            if (vodEvent.new) {
                delete vodEvent.selected;
                delete vodEvent.editable;
                delete vodEvent.new;
                delete vodEvent.name;
        
                vodEvent.windowStartTime = moment.utc(vodEvent.windowStartTime).startOf('day');
                vodEvent.windowEndTime = vodEvent.windowEndTime ?
                    moment.utc(vodEvent.windowEndTime).endOf('day') : null;
                vodEvent.contentId = contentId;
        
                return api.createVodEvent(vodEvent);
            }
        });
    },
    
    createCategoryReferences (categories, categoryReferences, contentId) {
        return categories.filter((category) => {
            const isInReferences = categoryReferences.find((ref) => {
                return ref.categoryId === category.id;
            });
    
            if (!isInReferences) {
                return api.createCategoryReference({
                    categoryId: category.id,
                    contentId
                });
            }
        });
    },
    
    deleteCategoryReferences (categories, categoryReferences, contentId) {
        return categoryReferences.filter((reference) => {
            const isInCategories = categories.find((category) => {
                return reference.categoryId === category.id;
            });
    
            if (!isInCategories) {
                return api.deleteCategoryReference({
                    categoryId: reference.categoryId,
                    contentId: contentId
                });
            }
        });
    },
    
    deleteVodEvents (originalVodEvents, vodEvents) {
        return originalVodEvents.filter((org) => {
            const isInVodEvents = vodEvents.find((vodEvent) => {
                return org.id === vodEvent.id;
            });
    
            if (!isInVodEvents) {
                return api.deleteVodEvent(org.id);
            }
        });
    },
    
    async saveContent(content, categories = [], vodEvents = []) {
        const promises = [];
        let newContent = {},
            categoryReferences = [],
            contentVodEvents = [];

        if (content.id) {
            newContent = await api.updateContent(content.id, content);
            categoryReferences = (await api.getCategoryReferences({
                contentId: content.id
            })).items;
            contentVodEvents = (await api.getContentVodEvents(content.id)).items

            promises.push(...this.deleteVodEvents(contentVodEvents, vodEvents));
            promises.push(...this.deleteCategoryReferences(categories,categoryReferences, content.id));
            promises.push(...this.createVodEvents(vodEvents, content.id));
            promises.push(...this.createCategoryReferences(categories, categoryReferences, content.id));
        } else {
            newContent = await api.createContent(content);
            promises.push(...this.createVodEvents(vodEvents, newContent.id));
            promises.push(...this.createCategoryReferences(categories, categoryReferences, newContent.id));
        }
    
        await Promise.all(promises);
        return newContent;
    },

    async deleteContent(content) {
        if (content && content.id) {
            await api.deleteContent(content.id);
        }
    }
}
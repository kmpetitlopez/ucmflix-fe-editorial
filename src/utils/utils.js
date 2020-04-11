import api from './api'
import _ from 'lodash'

export default {
    getImageUrl(id){
        return 'http://localhost:3000/static/images/' + id + '.jpg';
    },

    completeContentInfo(contents = []){
        return contents.map((content) => {
            content.imageUrl = this.getImageUrl(content.id);
            content.defaultImage = 'http://localhost:3000/static/images/default.jpg'
            content.hover = false;
            return content;
        });
    },

    async getHomeScreenInfo() {
        const categories = (await api.getCategories(
            [{activeCategories: true}]
        )).items;

        for (const category of categories) {
            const categoryReferences = (await api.getCategoryContents(
                    category.id
                )).items,
                contents = categoryReferences.map((categoryReference) => categoryReference.content);

            category.contents = this.completeContentInfo(contents);
        }

        return categories
    },

    async getHomeScreenNews() {
        const contents = (await api.getContents(
                [{activeContents: true}, {limit: 7}, {newContent: true}]
            )).items,
            contentWithImages = this.completeContentInfo(contents);

        return contentWithImages;
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

        category.contents = this.completeContentInfo(contents);

        return category;
    },

    async getDetailScreenInfo(id) {
        const content = await api.getContent(id);
        content.imageUrl = this.getImageUrl(id);
        return content;
    },

    async searchContent(title) {
        const contents = (await api.getContents([{title}])).items;

        return this.completeContentInfo(contents);
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
        const args = [{activeContents: true}, {seasonNumber}],
            contents = (await api.getContentEpisodes(id, args)).items;

        return this.completeContentInfo(contents);
    },

    async saveCategory(category) {
        const clonedCategory = _.cloneDeep(category);
        let newCategory = {};
        if (clonedCategory) {
            delete clonedCategory.contents;

            if (clonedCategory.id) {
                newCategory = await api.updateCategory(clonedCategory.id, clonedCategory);
            } else {
                newCategory = await api.createCategory(clonedCategory);
            }

            for (const content of category.contents) {
                if (content && !content.categoryReferenceId) {
                    await api.createCategoryReference({
                        categoryId: newCategory.id,
                        contentId: content.id
                    });
                }
            }
        }

        return newCategory;
    },

    async deleteCategory(category) {
        if (category && category.id) {
            await api.deleteCategory(category.id);
        }
    }
    
}
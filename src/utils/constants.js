const CONSTANTS = {
    CONTENT_TYPES: {
        movie: 'movie',
        episode: 'episode',
        special: 'special',
        master: 'master'
    },
    STATUS: {
        expired: 'expired',
        active: 'active',
        programmed: 'programmed'
    },
    PARENTAL_RATINGS: [
        'SC',
        'TP',
        'Infantil',
        '+7',
        '+10',
        '+12',
        '+13',
        '+16',
        '+18',
        'X'
    ]
};
export default {

    getConstants () {
        return CONSTANTS;
    },
    
    getContentTypeOptions () {
        return [
            {
                option: 'Película',
                value: CONSTANTS.CONTENT_TYPES.movie
            },
            {
                option: 'Serie',
                value: CONSTANTS.CONTENT_TYPES.master
            },
            {
                option: 'Episodio',
                value: CONSTANTS.CONTENT_TYPES.episode
            },
            {
                option: 'Especial',
                value: CONSTANTS.CONTENT_TYPES.special
            }
        ];
    }
}

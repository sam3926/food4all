const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#97033e',
                            '@border-radius-base': '4px',
                            '@layout-header-padding': '0 16px',
                            '@menu-item-padding': '0 16px',
                            '@timeline-color': '#97033e',
                            '@layout-sider-background': 'white'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
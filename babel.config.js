
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', { 
      libraryName: 'vant',
      libraryDirectory: 'es',
      // style: true  // 定制主题请将此行注释或移除
      style: name => `${name}/style/less`
    }, 'vant'],
    [ 
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

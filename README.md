# kaola-kol

社区Vue组件库

## 初始化组件库

```bash
npm run bootstrap
```

### 组件开发

在组件库项目根目录下

```bash
npm run create:comp
```

按照提示进行输入组件名称，自动在 packages 目录下创建组件目录 xxxx，生成的组件会自动命名为 `ct-xxxx`。

开发时请执行 dev npm 脚本，启动 [storybook](https://github.com/storybooks/storybook)，可以在浏览器打开 storybook 页面，在 .sotries.js 文件写 demo，进行调试，可以为组件的各种特性写指定的 story，直接在 storybook 进行展示。

```bash
npm run dev
```

### 单元测试

组件完成后，一定要编写单元测试，目前已经把 [jest](https://jestjs.io) 和 [vue-test-utils](https://vue-test-utils.vuejs.org) 集成其中，以保证组件库质量。

```bash
npm run test
```

### 代码质量

组件库集成了 `commitlint` 和 `eslint`，代码提交前，不仅会进行代码风格检查，还会检查 commit message 的格式。

commitlint 配置了 [@commitlint/config-angular](https://github.com/marionebl/commitlint/tree/master/@commitlint/config-angular) 风格。

eslint 配置了 [eslint-config-kaola/next](https://github.com/kaola-fed/eslint-config-kaola)。

在发布正式版时，会根据 commit 自动更新 CHANGELOG.md，所以一定要注意 commit message 的格式和内容。

### 持续集成

组件库开启了[gitlab CI](https://note.youdao.com/group/#/42540264/(folder/180948433//full:md/207791906))，目前配置了以下脚本

```bash
npm run test
```

在代码push之后会运行

## 组件目录

```
├── README.md
├── commitlint.config.js // commitlint 配置
├── .gitignore
├── jest.config.js // jest 配置
├── lerna.json // lerna 配置
├── library.config.js // 组件库配置
├── package.json
├── .npmrc // npm 配置
├── .storybook // storybook 目录
│   ├── addons.js // storybook 插件
│   ├── config.js // storybook 配置
│   ├── helper.js
│   ├── index.js // storybook 首页
│   └── webpack.config.js
├── packages // 组件包目录
│   └── demo // 组件目录
│       ├── README.md // 组件文档，会被引入到 stories
│       ├── index.js // 组件入口，挂载 install 方法
│       ├── package.json
│       ├── src
│       │   └── index.vue // 组件，自动命名为 ${prefix}-demo
│       ├── stories // demo 目录，会生成 storybook 目录
│       │   └── index.stories.js
│       └── test // 测试
│           └── index.spec.js
└── scripts
    └── component-template // 单个组件模版，可以修改每次新增的组件模版，自动引入 mixin、style 等
```

## 开发流程

从master拉新分支，分支格式为
- 需求：feature_KJDS-{jira Id}_{日期}，例如feature_KJDS-12345_20180823
- bug：hotfix_KJDS-{jira Id}_{日期}

进入开发
- 组件开发
- story测试
- ut编写
- readme编写

commit规范
- 需求：feat({组件}): {描述}，例如修改scrollbar组件，feat(scrollbar): 优化scroll性能
- bug: fix({组件}): {描述}

pr
- 通过pr方式merge进master
- pr要求
    * CI全部通过
    * 代码review通过

## 发布

发布使用了[lerna](https://note.youdao.com/group/#/42540264/(folder/180948433//full:md/207720811))作为多包管理工具，每一个组件会发布为kaola-kol scope下的一个包。

发布预发版，版本号 `x.x.x-beta.x`，npm `beta` 分支 。

```bash
npm run release:pre
```

发布正式版，版本号 `x.x.x`，同时会收集 commit 信息更新到 CHANGELOG.md 上。参考 [conventional-changelog-standard](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md)

```bash
npm run release
```

## 相关规范

以下列出了组件库的编码规范，编写代码之前请过一遍

- [vue规范](https://note.youdao.com/group/#/42540264/(folder/180948433//full:md/207821807))
- [css规范](https://note.youdao.com/group/#/42540264/(folder/180948433//full:md/208044249))
- [js注释规范](https://note.youdao.com/group/#/42540264/(folder/180948433//full:md/208044453))

## 你可能需要的查阅的资料

### demo 相关

- [storybook](https://github.com/storybooks/storybook)
- [@storybook/addon-knobs](https://github.com/storybooks/storybook/blob/master/addons/knobs/README.md)
- [@storybook/addon-actions](https://github.com/storybooks/storybook/blob/master/addons/actions/README.md)
- [storybook-readme](https://github.com/tuchk4/storybook-readme)
- [@storybook/addon-storysource](https://github.com/storybooks/storybook/blob/master/addons/storysource/README.md)
- [@storybook/addon-viewport](https://github.com/storybooks/storybook/blob/master/addons/viewport/README.md)
- [@storybook/addon-links](https://github.com/storybooks/storybook/blob/master/addons/links/README.md)
- [@storybook/addon-options](https://github.com/storybooks/storybook/blob/master/addons/options/README.md)

### 测试相关

- [jest](https://jestjs.io)
- [vue-test-utils](https://vue-test-utils.vuejs.org)

### 工程相关

- [lerna](https://github.com/lerna/lerna)
- [@commitlint/config-angular](https://github.com/marionebl/commitlint/tree/master/@commitlint/config-angular)
- [eslint-config-kaola/next](https://github.com/kaola-fed/eslint-config-kaola)
- [conventional-changelog-standard](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md)

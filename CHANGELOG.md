# [1.0.0-beta.56](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.55...v1.0.0-beta.56) (2022-03-30)


### Features

* change core module to asynchronous ([97ce7f6](https://github.com/TomokiMiyauci/mapcss/commit/97ce7f67722043c8b0c51be65168024160ce6268)), closes [#36](https://github.com/TomokiMiyauci/mapcss/issues/36)

# [1.0.0-beta.55](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.54...v1.0.0-beta.55) (2022-03-30)


### Bug Fixes

* **config:** resolved config file path must be file scheme ([e28f9f9](https://github.com/TomokiMiyauci/mapcss/commit/e28f9f962486b4f6044ccdcce2b80f00e6a17054))

# [1.0.0-beta.54](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.53...v1.0.0-beta.54) (2022-03-30)


### Bug Fixes

* **config:** fix refer to absolute path, typo ([bf3a6ae](https://github.com/TomokiMiyauci/mapcss/commit/bf3a6ae413cb3cbf9c1d2c4e7f0d0a3ce6faa133))

# [1.0.0-beta.53](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.52...v1.0.0-beta.53) (2022-03-30)


### Features

* **core:** add basic transform function that apply `[@apply](https://github.com/apply)` directive ([669641e](https://github.com/TomokiMiyauci/mapcss/commit/669641eca513d19e80318b0f0d554a32afc04046))
* **core:** apply extract before process [@apply](https://github.com/apply) ([1acd773](https://github.com/TomokiMiyauci/mapcss/commit/1acd7733e1c4e6c3799e7f5feec43c91d1a981ab))
* **core:** move `Config` types to core module ([1f505a5](https://github.com/TomokiMiyauci/mapcss/commit/1f505a5f1f9d0be23b425d0f7f6d3c41a86bb710))

# [1.0.0-beta.52](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.51...v1.0.0-beta.52) (2022-03-29)


### Bug Fixes

* **preset_tw:** fix list-* output css ([f268b43](https://github.com/TomokiMiyauci/mapcss/commit/f268b43e19456e7450bd64836584151d187f73da))


### Features

* **core:** add css property key types to `DeclBlock` types ([e55911e](https://github.com/TomokiMiyauci/mapcss/commit/e55911e364f1b05f3538471d2d00e61c75bfeff1))

# [1.0.0-beta.51](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.50...v1.0.0-beta.51) (2022-03-29)


### Bug Fixes

* **config:** remove resource proerpty from `Config` types ([f4652dd](https://github.com/TomokiMiyauci/mapcss/commit/f4652ddea2be2057bdfc87cb0e0a377a0d03f8ac))
* **core:** fix bracket extract function ([4b4cd31](https://github.com/TomokiMiyauci/mapcss/commit/4b4cd31b87e8b3e54316648f5a5d0dd5f6eaf659))


### Features

* **config:** add `applyExtractor` function, extractor property accept array ([d034045](https://github.com/TomokiMiyauci/mapcss/commit/d034045d760f6fbcdd873b4c2ef8bc856cab9784))
* **core:** add bracket extract function ([0a52563](https://github.com/TomokiMiyauci/mapcss/commit/0a525630ae0f9417fe5af413489885e087d03c1b))

# [1.0.0-beta.50](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.49...v1.0.0-beta.50) (2022-03-29)


### Bug Fixes

* **preset_typography:** ensure browser compatibility for module entry point ([b089b45](https://github.com/TomokiMiyauci/mapcss/commit/b089b45d7ff5dc3d878fdb12881bb080d479183b))

# [1.0.0-beta.49](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.48...v1.0.0-beta.49) (2022-03-28)


### Bug Fixes

* **core:** replace selector parser, the all module to be browser capatible ([6c41e53](https://github.com/TomokiMiyauci/mapcss/commit/6c41e53294102df3a4a7a36c91f38311f8972fce))

# [1.0.0-beta.48](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.47...v1.0.0-beta.48) (2022-03-28)


### Features

* **core:** change cssObject types to accept declaration block definition ([74f3281](https://github.com/TomokiMiyauci/mapcss/commit/74f3281f55fe7a1c66b43c2949318fe9c1c8b826))
* **core:** change cssObject types to remove Root AST ([2306333](https://github.com/TomokiMiyauci/mapcss/commit/2306333db8981f6b0406a2183219f23e25ce0ae3))

# [1.0.0-beta.47](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.46...v1.0.0-beta.47) (2022-03-27)


### Bug Fixes

* **config:** change import resource mod to independent file ([cdc0cce](https://github.com/TomokiMiyauci/mapcss/commit/cdc0cceb1c2eb7e10b27f1f5ed5c0bb70a273e17))
* **config:** fix resolving relative path, export sub module ([48469d1](https://github.com/TomokiMiyauci/mapcss/commit/48469d1cfe0ef16771dcbfbd1aebb698dc5bd622))

# [1.0.0-beta.46](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.45...v1.0.0-beta.46) (2022-03-27)


### Bug Fixes

* **core:** injected CSS should be placed first ([8834f25](https://github.com/TomokiMiyauci/mapcss/commit/8834f25ee1f20fbc742dffdda89567a5d3a5cd0c)), closes [#32](https://github.com/TomokiMiyauci/mapcss/issues/32)


### Features

* **common:** common variables and theme move to common ([42c2c81](https://github.com/TomokiMiyauci/mapcss/commit/42c2c8195bb853887f9fdc1e5d5dbb8597190364))
* **config:** add config and config file resolve functions ([6f27c28](https://github.com/TomokiMiyauci/mapcss/commit/6f27c281a7a68c50df710e3fe9abea11f6c33d8e))
* **core:** generate of `css` property accept array ([3abb517](https://github.com/TomokiMiyauci/mapcss/commit/3abb517360cd52acc671ca6e8a4bd9d902dc6be1)), closes [#33](https://github.com/TomokiMiyauci/mapcss/issues/33)

# [1.0.0-beta.45](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.44...v1.0.0-beta.45) (2022-03-24)


### Bug Fixes

* **preset_tw:** fix minus(-) modifier that nagativify number or number with unit only ([9a4e706](https://github.com/TomokiMiyauci/mapcss/commit/9a4e706fed7db138a17550eed696662d55c13e2c)), closes [#30](https://github.com/TomokiMiyauci/mapcss/issues/30)

# [1.0.0-beta.44](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.43...v1.0.0-beta.44) (2022-03-24)


### Bug Fixes

* **core:** fix resolve css map algorism ([2e338fd](https://github.com/TomokiMiyauci/mapcss/commit/2e338fdc82106fb95ba4ae2d8d03a62691525ce4)), closes [#28](https://github.com/TomokiMiyauci/mapcss/issues/28)

# [1.0.0-beta.43](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.42...v1.0.0-beta.43) (2022-03-22)


### Features

* **config:** add minimum mapcss config definition ([e13067e](https://github.com/TomokiMiyauci/mapcss/commit/e13067e8f4f1bec3ee8fc9986c0770ccf762f2b4))
* **core:** remove extract feature from `generate` function ([1b2702c](https://github.com/TomokiMiyauci/mapcss/commit/1b2702cb7e2ddb27346964da2a33a37b9717c9a8)), closes [#26](https://github.com/TomokiMiyauci/mapcss/issues/26)
* **core:** rename types of `Config` to `GenerateConfig` ([9098f79](https://github.com/TomokiMiyauci/mapcss/commit/9098f796a900b087d702d4e811e43d482c1d7e03))

# [1.0.0-beta.42](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.41...v1.0.0-beta.42) (2022-03-21)


### Features

* **preset_svg:** add color mode interface to select output css format ([2412826](https://github.com/TomokiMiyauci/mapcss/commit/24128260d2ca74efe6b2f1f6fa2d43e53b7d07da))
* **preset_svg:** change `presetSvg` interface that accept first argument as `svgMap` ([e7a284e](https://github.com/TomokiMiyauci/mapcss/commit/e7a284e7866e829e5bbd2311782b8086ac06cb25))
* **preset_svg:** rename export name `presetSvg` to `presetSVG` ([b044332](https://github.com/TomokiMiyauci/mapcss/commit/b0443323806d15a174385adb2c0428e7f838358c))

# [1.0.0-beta.41](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.40...v1.0.0-beta.41) (2022-03-20)


### Bug Fixes

* **preset_svg:** change deps registry for avoid build error ([8e5dbdb](https://github.com/TomokiMiyauci/mapcss/commit/8e5dbdb9b3e3bc11bcb968bb8321d8a5385d3f88))
* remove `mod.ts` under the project root ([8bad6e4](https://github.com/TomokiMiyauci/mapcss/commit/8bad6e45169ff2b554240ac90b43e035387dd9a3)), closes [#24](https://github.com/TomokiMiyauci/mapcss/issues/24)

# [1.0.0-beta.40](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.39...v1.0.0-beta.40) (2022-03-20)


### Bug Fixes

* **preset_svg:** remove vendor prefix from css definition ([9c118b1](https://github.com/TomokiMiyauci/mapcss/commit/9c118b163a2403294c2c7efb33dafbfbe6ff28eb)), closes [#23](https://github.com/TomokiMiyauci/mapcss/issues/23)

# [1.0.0-beta.39](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.38...v1.0.0-beta.39) (2022-03-19)


### Bug Fixes

* **core:** fix statement order logic ([6f86977](https://github.com/TomokiMiyauci/mapcss/commit/6f8697727a9e7a6a948d36a6fdc40b5c65298eab))

# [1.0.0-beta.38](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.37...v1.0.0-beta.38) (2022-03-19)


### Features

* **preset_svg:** add detect svg render mode ([213d553](https://github.com/TomokiMiyauci/mapcss/commit/213d5534264887d2c90081fbf443c6c61bc896fb))

# [1.0.0-beta.37](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.36...v1.0.0-beta.37) (2022-03-19)


### Features

* use postcss_core instead of postcss because it is browser capable ([1261e68](https://github.com/TomokiMiyauci/mapcss/commit/1261e681f264da2c807e7d78542ddb8a877a8c6f)), closes [#13](https://github.com/TomokiMiyauci/mapcss/issues/13)

# [1.0.0-beta.36](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.35...v1.0.0-beta.36) (2022-03-17)


### Bug Fixes

* **core:** fix to treating custom variable of declaration value is empty string ([61f5e4a](https://github.com/TomokiMiyauci/mapcss/commit/61f5e4a5c9390f34989e104d21b379bde6dbbb02)), closes [#16](https://github.com/TomokiMiyauci/mapcss/issues/16)

# [1.0.0-beta.35](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.34...v1.0.0-beta.35) (2022-03-17)


### Features

* **core:** selectable extract function ([c68ba46](https://github.com/TomokiMiyauci/mapcss/commit/c68ba46cf8f1e3d351fdd7e84203b3334fb8b2e0)), closes [#19](https://github.com/TomokiMiyauci/mapcss/issues/19)
* **core:** types of Config should be partial as default ([72b623c](https://github.com/TomokiMiyauci/mapcss/commit/72b623ca211d80464b2161b3981b0dd7f5461dbf)), closes [#20](https://github.com/TomokiMiyauci/mapcss/issues/20)
* re-design generate function interface ([131f41f](https://github.com/TomokiMiyauci/mapcss/commit/131f41f27a8c5081dd8e23d9da2e58516b9518ce)), closes [#17](https://github.com/TomokiMiyauci/mapcss/issues/17)

# [1.0.0-beta.34](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.33...v1.0.0-beta.34) (2022-03-15)


### Features

* change modifier map to accept empty key and asta key ([8b5012b](https://github.com/TomokiMiyauci/mapcss/commit/8b5012b61713078f0094579019ee3ad09ac23ec1))
* **core:** remove key property from css map context ([da60198](https://github.com/TomokiMiyauci/mapcss/commit/da601986f6b6993a2593f27e2aa59c33e2eeb0ce))
* split match info and context interface ([4b0f3b1](https://github.com/TomokiMiyauci/mapcss/commit/4b0f3b1b9a2f1fa7850e527d254af2f031a87754))
* **utils:** add utility for mapcss ([12516ca](https://github.com/TomokiMiyauci/mapcss/commit/12516ca139cebd3b2d7363cb17b871290e6f04b6))

# [1.0.0-beta.33](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.32...v1.0.0-beta.33) (2022-03-15)


### Bug Fixes

* **preset_svg:** change import source ([35ab084](https://github.com/TomokiMiyauci/mapcss/commit/35ab0844bbc4797dd5b3e569016bfa465a6b1ab4))


### Features

* change `cssMap` interface ([834fe0a](https://github.com/TomokiMiyauci/mapcss/commit/834fe0a8fed7ad26dc5ba75dd8adef480876d47a)), closes [#15](https://github.com/TomokiMiyauci/mapcss/issues/15)


### Performance Improvements

* **core:** change pre merge css map algolism ([c90eae9](https://github.com/TomokiMiyauci/mapcss/commit/c90eae9f8c9c43f685c70027f6b639bd07d90b98))

# [1.0.0-beta.32](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.31...v1.0.0-beta.32) (2022-03-06)


### Bug Fixes

* **preset_svg:** fix external import specifier ([31fced2](https://github.com/TomokiMiyauci/mapcss/commit/31fced2e057661d33634ef5013f2e6e2e64ee47e))
* **preset_svg:** fix types of convert args ([d8b2df3](https://github.com/TomokiMiyauci/mapcss/commit/d8b2df3ce976ae481c76e444daffd47b6981c65e))
* **preset_tw:** remove external ordering media query because the module deps is invalid ([4a691e1](https://github.com/TomokiMiyauci/mapcss/commit/4a691e1d4a5abdea3562b669546d09600039ecf6))

# [1.0.0-beta.31](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.30...v1.0.0-beta.31) (2022-03-06)


### Bug Fixes

* change dependency version or import source for capability of low deno version ([2650b0e](https://github.com/TomokiMiyauci/mapcss/commit/2650b0e9277fa879ec5ad17eb3871aa4b6672784))

# [1.0.0-beta.30](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.29...v1.0.0-beta.30) (2022-03-05)


### Bug Fixes

* quit named types export ([e2c928a](https://github.com/TomokiMiyauci/mapcss/commit/e2c928a9cbf6d0814b036d6c73bb86e06d233b0c)), closes [#12](https://github.com/TomokiMiyauci/mapcss/issues/12)

# [1.0.0-beta.29](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.28...v1.0.0-beta.29) (2022-03-05)


### Bug Fixes

* **core:** change assert logic with type checking ([d3f9b17](https://github.com/TomokiMiyauci/mapcss/commit/d3f9b1782069d899c91c7d8b57cbaf62bdf2fbe3)), closes [#10](https://github.com/TomokiMiyauci/mapcss/issues/10)


### Features

* **preset_tw:** add group-{modifier} ([7f1da38](https://github.com/TomokiMiyauci/mapcss/commit/7f1da38e7a0a5a66dbb48267530df978987044a5))

# [1.0.0-beta.28](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.27...v1.0.0-beta.28) (2022-03-03)


### Features

* **preset_svg:** rename preset_icon to preset_svg ([256c815](https://github.com/TomokiMiyauci/mapcss/commit/256c81554e28d0355e9ffefe915707cd3b793f24))

# [1.0.0-beta.27](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.26...v1.0.0-beta.27) (2022-03-03)


### Features

* **preset_tw:** add modifier for [@media](https://github.com/media) at-rule ([56531b6](https://github.com/TomokiMiyauci/mapcss/commit/56531b60f06aad24f4510f9ea1f3397ce3149b93))
* **preset_tw:** add modifier for pseudo-elements ([cc1c32f](https://github.com/TomokiMiyauci/mapcss/commit/cc1c32fe89033f25b8489214e21c0375e22f5b8c))
* **preset_tw:** add modifier of `rtl` and `ltr` ([d3f5113](https://github.com/TomokiMiyauci/mapcss/commit/d3f5113f156f99eebda1dc78dd023e97bcd7e030))

# [1.0.0-beta.26](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.25...v1.0.0-beta.26) (2022-03-02)


### Features

* **preset_tw:** add modifier of `before` ([567eab6](https://github.com/TomokiMiyauci/mapcss/commit/567eab65515e53211f36414477b4a8b56fed7cbe))

# [1.0.0-beta.25](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.24...v1.0.0-beta.25) (2022-03-02)


### Bug Fixes

* **core:** fix resolve modifier map ([26074de](https://github.com/TomokiMiyauci/mapcss/commit/26074deb0a1183f2f1da0c946877138a36cfa805))
* **preset_tw:** fix pseudo modifier ([7a61c7e](https://github.com/TomokiMiyauci/mapcss/commit/7a61c7eb3db0a2319f3ece0393c30f15de6f7ac5))


### Features

* **core:** add ast utility ([668ee8c](https://github.com/TomokiMiyauci/mapcss/commit/668ee8c0cc0361ad127dcf39ac2250d69a0a1ab4))
* **core:** change `modifierMap` interface to accept recursive modifier dirinition ([6d71ccb](https://github.com/TomokiMiyauci/mapcss/commit/6d71ccbf45c6736714d374107aff72b262c36df9))
* **preset_tw:** add some puseudo as modifier ([59a4390](https://github.com/TomokiMiyauci/mapcss/commit/59a4390290ac8c752a889741b582c064cb939586))

# [1.0.0-beta.24](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.23...v1.0.0-beta.24) (2022-03-02)


### Bug Fixes

* **core:** fix to order of modifier applyment is right to left ([1bebcd7](https://github.com/TomokiMiyauci/mapcss/commit/1bebcd7e0349f000b44ec533a6cadbef2d94dd42))
* **preset_tw:** breakpoint modifier apply at-rule node and rule node only ([4845e9d](https://github.com/TomokiMiyauci/mapcss/commit/4845e9d35eaf92116f71424d3f48e31cc2d1d77d))
* **preset_tw:** fix ordering target is root child only ([9e2d0d4](https://github.com/TomokiMiyauci/mapcss/commit/9e2d0d407415dbb1edcbdeecdcf3e2ce0b1d8bd2))


### Features

* **preset_tw:** add switching dark mode `class` or `media` ([2c8c521](https://github.com/TomokiMiyauci/mapcss/commit/2c8c521977677c8384ca46745ea597162e6c1027))

# [1.0.0-beta.23](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.22...v1.0.0-beta.23) (2022-03-01)


### Bug Fixes

* **core:** fix escape class selector ([768f578](https://github.com/TomokiMiyauci/mapcss/commit/768f578866f5fd7787c5bc762395757bd93bd446))

# [1.0.0-beta.22](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.21...v1.0.0-beta.22) (2022-03-01)


### Features

* **core:** add postcss plugin for order statement ([ee0b72b](https://github.com/TomokiMiyauci/mapcss/commit/ee0b72be05150cfee22c63b90cf5d3b4abd324b9))
* **preset_icon:** add `declaration` property for extend or overwrite defalut style ([4499caf](https://github.com/TomokiMiyauci/mapcss/commit/4499caf5f0b8e38cc6c7ac30fc1f6b78988a6e3b))

# [1.0.0-beta.21](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.20...v1.0.0-beta.21) (2022-02-28)


### Bug Fixes

* **preset_tw:** fix postcss plugin field name ([c7b2b93](https://github.com/TomokiMiyauci/mapcss/commit/c7b2b937faa68476a9522a6bd7d678218d12a366))
* **preset_typography:** remove const class name ([22a2534](https://github.com/TomokiMiyauci/mapcss/commit/22a253486398b7ba81a59282068d851fcbfa366a))


### Features

* **core:** accept postcss plugin ([3581a2d](https://github.com/TomokiMiyauci/mapcss/commit/3581a2dc2d0fd09ed97e7b13f948e091ed68c4c5))
* **preset_tw:** add  sort media queries as postcss plugin ([adc06ce](https://github.com/TomokiMiyauci/mapcss/commit/adc06ce3224d2e9e90b0d6ddfe4aa34e0c105fa0))
* **preset_typography:** change `className` of identifier root ([e9fde39](https://github.com/TomokiMiyauci/mapcss/commit/e9fde3985fa9b1092a2489585c8b43b56a96d92e))
* **preset_typography:** remove prose body class because prose target is only children ([523b66c](https://github.com/TomokiMiyauci/mapcss/commit/523b66cd8e726ea1a3551c8135421e35c9d732eb))

# [1.0.0-beta.20](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.19...v1.0.0-beta.20) (2022-02-27)


### Bug Fixes

* rename `specifier` to `identifier` whole of project ([f4e1117](https://github.com/TomokiMiyauci/mapcss/commit/f4e11177cb3e0dfa5d4972f0b1c8aaa3a0e1616f))
* rename to `identifierMap` to `cssMap` ([601024c](https://github.com/TomokiMiyauci/mapcss/commit/601024cf73cee54489820abaa396262a83ea8585))


### Features

* **preset_tw:** add preflight object as CSS-in-JS ([b801bf7](https://github.com/TomokiMiyauci/mapcss/commit/b801bf7c7a9041841bf94d6e85257f0587e6f194))

# [1.0.0-beta.19](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.18...v1.0.0-beta.19) (2022-02-27)


### Bug Fixes

* **core:** merge specifierMap from argument ([dc5f37b](https://github.com/TomokiMiyauci/mapcss/commit/dc5f37b3b862b4e08802e9d72deb572ecad4dd21))


### Features

* **core:** add default syntax what handle specifier as is ([d8bfc4e](https://github.com/TomokiMiyauci/mapcss/commit/d8bfc4ec62c75940cd2d010f36138d077cb9a4fe))
* **core:** add injection raw css as CSS-in-JS ([d3c5fbb](https://github.com/TomokiMiyauci/mapcss/commit/d3c5fbb86285e8e4adcccce6d6c8660f41db1619))
* **core:** add output format of CSS-in-JS ([bdc48ac](https://github.com/TomokiMiyauci/mapcss/commit/bdc48ac53af03f54de47ccd63406e471d08e25a8))
* **core:** move to generate file, return generated css with AST ([155c0e4](https://github.com/TomokiMiyauci/mapcss/commit/155c0e41ff7fbdb6f0652c82520a8b5032c5c0f4))
* **preset_tw:** add preset option for selectable inject variable ([731b3fd](https://github.com/TomokiMiyauci/mapcss/commit/731b3fd8e9ec1f22f611c240d3af4917ed5581f4))

# [1.0.0-beta.18](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.17...v1.0.0-beta.18) (2022-02-27)


### Bug Fixes

* **core:** check if rest path is exists or not ([c07a05d](https://github.com/TomokiMiyauci/mapcss/commit/c07a05d124987db66e18960a4b2deef4adf838bc))
* **core:** remove node if specifier definition is empty object ([1df69b5](https://github.com/TomokiMiyauci/mapcss/commit/1df69b5789aed9ebc27f4b3da38acf325af44be6))


### Features

* **core:** add objectify function that convert JavaScript Object from postcss AST ([712e347](https://github.com/TomokiMiyauci/mapcss/commit/712e347a152f1088bf9071356c178fdb90a92c32))
* **core:** astify function become to return root node ([c154bb0](https://github.com/TomokiMiyauci/mapcss/commit/c154bb03e5c4e6e97db607c8cb1d75c23e81ba16))
* **preset_icon:** add preset for SVG icon as CSS ([669e409](https://github.com/TomokiMiyauci/mapcss/commit/669e409633fb3e457abd2a6b15c48a69701e190e))
* **preset_typography:** change export name ([997f202](https://github.com/TomokiMiyauci/mapcss/commit/997f2021acd06989a330518648942160896f9051))

# [1.0.0-beta.17](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.16...v1.0.0-beta.17) (2022-02-26)


### Features

* **core:** change types of config, pass static context and runtime context ([0e1487c](https://github.com/TomokiMiyauci/mapcss/commit/0e1487ca6d1aa952b90107a40d5759e73c5972e9))
* **preset_typography:** clean up rule if the declaration block becomes empty ([437ee0a](https://github.com/TomokiMiyauci/mapcss/commit/437ee0aa2bb4adadf87ec37f20f92c0d236a74c2))

# [1.0.0-beta.16](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.15...v1.0.0-beta.16) (2022-02-25)


### Features

* **preset_typography:** add `css` interface for preset typography, that extend or override default ([47f4835](https://github.com/TomokiMiyauci/mapcss/commit/47f4835cc2cdcf8a0b9821e529b6ef3334f272c1))
* **preset_typography:** add disable default style with JSS style ([0dccfe2](https://github.com/TomokiMiyauci/mapcss/commit/0dccfe2a0063c95c106e2ad27ef77e1eeee7e8d3))
* **preset_typography:** add filtering selector with splitted selector list ([b586376](https://github.com/TomokiMiyauci/mapcss/commit/b586376e8d3cca013aa3d0f0847b20f07e750900))
* **preset_typography:** override css regardless of selector shifts ([62f94e9](https://github.com/TomokiMiyauci/mapcss/commit/62f94e9eab730106f95ca736caa07836915062f0))

# [1.0.0-beta.15](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.14...v1.0.0-beta.15) (2022-02-25)


### Bug Fixes

* **preset_typography:** use parentKey instread of key ([437089d](https://github.com/TomokiMiyauci/mapcss/commit/437089dd8bf31bc9d8d1a16f16addb42e25c9ced))


### Features

* **core:** add pre process that each specifierMap merge to deep Map ([33107c4](https://github.com/TomokiMiyauci/mapcss/commit/33107c45e47ab822242b2acf34c4851610099718))
* **core:** change specifier context to include `parentKey` ([9ce1f26](https://github.com/TomokiMiyauci/mapcss/commit/9ce1f268b818f8e1827d29772f2eb8cdf0119363))
* **core:** extend cssObject interface for define root AST ([d470ced](https://github.com/TomokiMiyauci/mapcss/commit/d470cedbc0831205f9d1e25c29bca47170dcb11d))
* **preset_typography:** add specifier of `prose.invert` ([d3e54cd](https://github.com/TomokiMiyauci/mapcss/commit/d3e54cdbded77bf542e3365eab402192f94a95a1))
* **preset_typography:** add specifier of `prose.invert` and `prose.theme.color` ([30b78c7](https://github.com/TomokiMiyauci/mapcss/commit/30b78c755f926e4ff5dad41c4c259b9ce1c429e0))

# [1.0.0-beta.14](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.13...v1.0.0-beta.14) (2022-02-23)


### Features

* **core:** add path and key as specifier context ([6459eef](https://github.com/TomokiMiyauci/mapcss/commit/6459eefa2393a10159d8844249d592c3f2389d27))
* **preset_tw:** add specifier of `animation` ([21b9aa7](https://github.com/TomokiMiyauci/mapcss/commit/21b9aa734e6e786622d3314c4c704a0a282f4a7b))

# [1.0.0-beta.13](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.12...v1.0.0-beta.13) (2022-02-23)


### Features

* **core:** change to generate postcss AST from specifier ([6d85763](https://github.com/TomokiMiyauci/mapcss/commit/6d8576311f550052bf16ad73a3c72a88d1eee688)), closes [#4](https://github.com/TomokiMiyauci/mapcss/issues/4)

# [1.0.0-beta.12](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2022-02-21)


### Bug Fixes

* **preset_typography:** fix selector format with pseudo ([40fd062](https://github.com/TomokiMiyauci/mapcss/commit/40fd06232be89c8a639c1440eb2fa00ae256a810))


### Features

* **core:** change declaration data type to ordered array object ([4c6eef8](https://github.com/TomokiMiyauci/mapcss/commit/4c6eef80b214ddf08043a7269943ec300ac53ed8))
* **core:** change modifier types to accept record style ([c044aba](https://github.com/TomokiMiyauci/mapcss/commit/c044aba5d45f83d4eb47aa6bc693c86f374120b9))
* **core:** merge localModifire and globalModifier interface ([1a23111](https://github.com/TomokiMiyauci/mapcss/commit/1a23111ac63099ec0d57917346205a8c4bd43063))
* **preset_tw:** add modifier of `group-hover` ([d5ffad1](https://github.com/TomokiMiyauci/mapcss/commit/d5ffad1594df4df27c1e8c5489eb4994facc034e))

# [1.0.0-beta.11](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2022-02-19)


### Bug Fixes

* **core:** improve marging config logic ([8d60906](https://github.com/TomokiMiyauci/mapcss/commit/8d60906277d2b18b906f6dc031b87de5beed62f1))
* **preset_tw:** remove specifier of `backface` what is not support tailwindcss ([9ce0a68](https://github.com/TomokiMiyauci/mapcss/commit/9ce0a688d68e6e498dcfc9841c661dcdc9db4ca4))


### Features

* **core:** add charMap feature what is mapping char to token ([45bde47](https://github.com/TomokiMiyauci/mapcss/commit/45bde4766c4ebf7e706f0ee353af771277b96dd1))
* **core:** add declaration order processor as default ([c66321e](https://github.com/TomokiMiyauci/mapcss/commit/c66321ee23269dfd073fef7b658ef26c83414ee8))
* **core:** change `CSSStatement` interface ([25bac55](https://github.com/TomokiMiyauci/mapcss/commit/25bac5534081325f39c46cadb6193e016170ae9a))
* **core:** change selector interface of specifier definition ([6fdc2cc](https://github.com/TomokiMiyauci/mapcss/commit/6fdc2ccc99d2406c5e146014f9fb935ac0348031))
* **core:** improve selector escape function ([f496c63](https://github.com/TomokiMiyauci/mapcss/commit/f496c638fb34b16c674deeddeb0f2af2e8b3e59c))
* **preset_tw:** add injecting custom variable as post processor ([adceb52](https://github.com/TomokiMiyauci/mapcss/commit/adceb524b1bf14f9dd25e5c4725c96b5e61df8e9))
* **preset_tw:** add specifier of `flow` ([a7a8e0f](https://github.com/TomokiMiyauci/mapcss/commit/a7a8e0fae2808160b1765109f954502579a8af33))
* **preset_tw:** add specifier of arbitrary rule ([a027dd8](https://github.com/TomokiMiyauci/mapcss/commit/a027dd84b4d638acdf1271bfaa919c9035db3808))
* **preset_typography:** add basic preset of typography ([888efe5](https://github.com/TomokiMiyauci/mapcss/commit/888efe5142ca7efb9371cc765a68cb3f69486aa4))

# [1.0.0-beta.10](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2022-02-16)


### Bug Fixes

* **core:** deep marge duplicated selector ([1d17cb2](https://github.com/TomokiMiyauci/mapcss/commit/1d17cb29d91f0360e8944cddf9416a81e990e40c))
* **preset_tw:** specifier of container use screen theme ([b3a18c1](https://github.com/TomokiMiyauci/mapcss/commit/b3a18c16fc85009da9f9332d4864ceb4c904dd5a))


### Features

* **core:** add order system for css statement ([90e22ff](https://github.com/TomokiMiyauci/mapcss/commit/90e22ff6f3fa7223dfad857e4344215c1fa8f9b9))
* **core:** extend interface of specifier ([2ffc270](https://github.com/TomokiMiyauci/mapcss/commit/2ffc270d7ea89074022fb1b147dc0a8fa49bde3f))
* **core:** rename `generate` to `generateStyleSheet`, add postProcessor ([750fac7](https://github.com/TomokiMiyauci/mapcss/commit/750fac79491a4a6df910ee406fd3e56e579e64fa))
* **preset_tw:** add arbitrary rule for `h` ([8c1f0c5](https://github.com/TomokiMiyauci/mapcss/commit/8c1f0c5ffd4d151c89a89cf0791440e366afad02))
* **preset_tw:** add specifier of `container` ([6cddf43](https://github.com/TomokiMiyauci/mapcss/commit/6cddf436f141b5a41a4c476f01da52cbecc062cb))

# [1.0.0-beta.9](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2022-02-10)


### Features

* **preset_tw:** add arbitary rule to `border-color` ([426c6a0](https://github.com/TomokiMiyauci/mapcss/commit/426c6a0e014f2136e4115daf51b3d9378ab9d250))
* **preset_tw:** add arbitrary rule for `divide` ([a8e8277](https://github.com/TomokiMiyauci/mapcss/commit/a8e82772b7c0217e96d3133bb4fff41b0d185097))
* **preset_tw:** add arbitrary rule of `outline` ([37a9937](https://github.com/TomokiMiyauci/mapcss/commit/37a993795094ff734194214b838817e763a222e3))
* **preset_tw:** add specifier for `gradient-color-steps` ([eda7df8](https://github.com/TomokiMiyauci/mapcss/commit/eda7df81a72602cd6172eced292674e59acd5c57))
* **preset_tw:** add specifier for `ring-color` ([9f1d16e](https://github.com/TomokiMiyauci/mapcss/commit/9f1d16e89172a1aafc22e8350c81185b2af8c16b))
* **preset_tw:** add specifier for `ring-offset-color` ([6a5be57](https://github.com/TomokiMiyauci/mapcss/commit/6a5be578048b69994916d86a9b8250859f27bed6))
* **preset_tw:** add specifier for `scroll-behavior` ([f94bf1b](https://github.com/TomokiMiyauci/mapcss/commit/f94bf1b2180d48807437a5403eec5180cf9f36c3))
* **preset_tw:** add specifier for `scroll-margin` ([617aac6](https://github.com/TomokiMiyauci/mapcss/commit/617aac6d0f3b0e6c59e1ff26746b6efba1a6047a))
* **preset_tw:** add specifier for `scroll-padding` ([32a7836](https://github.com/TomokiMiyauci/mapcss/commit/32a78361fe747443e3ad7aa675b3cbe9d23706bd))
* **preset_tw:** add specifier for `scroll-snap-align` ([b64d705](https://github.com/TomokiMiyauci/mapcss/commit/b64d7050680abe830f90c557b78aa84063bd04cd))
* **preset_tw:** add specifier for `scroll-snap-stop` ([dddee5c](https://github.com/TomokiMiyauci/mapcss/commit/dddee5ccc20f5ca7297c42bb9331921bfb0cc8a6))
* **preset_tw:** add specifier for `scroll-snap-type` ([cf26590](https://github.com/TomokiMiyauci/mapcss/commit/cf26590001e88101dac1d3fd742fd6f6caed068b))
* **preset_tw:** add specifier for `stroke-width` ([3485bd0](https://github.com/TomokiMiyauci/mapcss/commit/3485bd07ccab77f459acb08e14f61c39a51bda66))
* **preset_tw:** add specifier for `stroke` ([a5ffbb0](https://github.com/TomokiMiyauci/mapcss/commit/a5ffbb0f9dc3aeb01ebdf9167eb07c851fb2f99c))
* **preset_tw:** add specifier for `text-decoration-color` ([d5854d3](https://github.com/TomokiMiyauci/mapcss/commit/d5854d3020f70319bc5e8575cfebeb24beaaed11))
* **preset_tw:** add specifier of `accent` ([ce3b437](https://github.com/TomokiMiyauci/mapcss/commit/ce3b4374841ee665b09ed7bb121d5c7ab950fcaf))
* **preset_tw:** add specifier of `appearance` ([09801bb](https://github.com/TomokiMiyauci/mapcss/commit/09801bb0a6c0a0406615aef6957ac3a2480f5290))
* **preset_tw:** add specifier of `carret` ([8519ef5](https://github.com/TomokiMiyauci/mapcss/commit/8519ef5164eae8a45daa0f269c600254e377e6ae))
* **preset_tw:** add specifier of `cursor` ([7effd08](https://github.com/TomokiMiyauci/mapcss/commit/7effd08755cc4ddb2e4e06ba633e9e936267d9ac))
* **preset_tw:** add specifier of `fill` ([37cc3b2](https://github.com/TomokiMiyauci/mapcss/commit/37cc3b258fd4c46781aaefbc96ea6ebdb7c9eac5))
* **preset_tw:** add specifier of `pointer` ([c5b2744](https://github.com/TomokiMiyauci/mapcss/commit/c5b2744134e7ae296b7129e3173396864ef9a44a))
* **preset_tw:** add specifier of `resize` ([b1a9729](https://github.com/TomokiMiyauci/mapcss/commit/b1a9729afc7017fc6e0c8748a764c0ccbfc686b0))
* **preset_tw:** add specifier of `touch` ([c861e49](https://github.com/TomokiMiyauci/mapcss/commit/c861e49cf354ad93a2d409b1a63291c410422da2))
* **preset_tw:** add specifier of `user` ([96e661a](https://github.com/TomokiMiyauci/mapcss/commit/96e661a9fc38326464c88d4f7ab7cf72ebad0565))
* **preset_tw:** add specifier of `will` ([4c7068a](https://github.com/TomokiMiyauci/mapcss/commit/4c7068a571bfac3f4cf50d18490ebf4205f073b0))
* **preset_tw:** change color number format to rgb ([5592491](https://github.com/TomokiMiyauci/mapcss/commit/55924914a856d2a24b4aa3e2ef567c1b5750bf0e))
* **preset_tw:** change color style to rgb, add arbitaray rule ([166f110](https://github.com/TomokiMiyauci/mapcss/commit/166f1105c5bd82c912193ede9e8038cdaacf16b7))

# [1.0.0-beta.8](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2022-02-09)


### Features

* **preset_tw:** add specifier of `delay` ([d62204d](https://github.com/TomokiMiyauci/mapcss/commit/d62204d7d5f0d3da24ece85102a808af75de920d))
* **preset_tw:** add specifier of `duration` ([f7716ec](https://github.com/TomokiMiyauci/mapcss/commit/f7716ec718a101892c02f97d5a8e25c1cc554763))
* **preset_tw:** add specifier of `ease` ([3596a94](https://github.com/TomokiMiyauci/mapcss/commit/3596a9455e1ba2f8974aa707f6d0340e6fd136e1))
* **preset_tw:** add specifier of `origin` ([ec68b7b](https://github.com/TomokiMiyauci/mapcss/commit/ec68b7b1f8acbd5d6af54549adb9bfa268f04e60))
* **preset_tw:** add specifier of `rotate` ([1348467](https://github.com/TomokiMiyauci/mapcss/commit/1348467aff8a2033b5771cad1c579f7aec7935c0))
* **preset_tw:** add specifier of `scale` ([02b5f50](https://github.com/TomokiMiyauci/mapcss/commit/02b5f50f8cabd2d8bd731cde7ea8a5dd3b4903b7))
* **preset_tw:** add specifier of `skew` ([e78253e](https://github.com/TomokiMiyauci/mapcss/commit/e78253ebf29409811d8aeff75cf9af9835040604))
* **preset_tw:** add specifier of `transition` ([558bf83](https://github.com/TomokiMiyauci/mapcss/commit/558bf8353b3361e1f6e935056727b4fba5c90a0e))
* **preset_tw:** add specifier of `translate` ([7b5c347](https://github.com/TomokiMiyauci/mapcss/commit/7b5c3474684e9ffeca39270445447b4e37597c63))

# [1.0.0-beta.7](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.6...v1.0.0-beta.7) (2022-02-08)


### Bug Fixes

* **core:** add checking if return value is function or not ([6bbda2e](https://github.com/TomokiMiyauci/mapcss/commit/6bbda2e9856be646f4f3d171e173de0aa2d7a05c))


### Features

* **preset_tw:** add sepecifier of `sepia` ([1033ae1](https://github.com/TomokiMiyauci/mapcss/commit/1033ae1c24635036397255d062bb359e29fc3138))
* **preset_tw:** add specifier for `backdrop-brightness` ([a8b0c23](https://github.com/TomokiMiyauci/mapcss/commit/a8b0c23530ce39c0fee6ef2895435984df9a65ae))
* **preset_tw:** add specifier for `backdrop-contrast` ([0be6bc4](https://github.com/TomokiMiyauci/mapcss/commit/0be6bc433ad2d3906f10d43243e24c821814a2b7))
* **preset_tw:** add specifier for `backdrop-filter` ([8c32b7d](https://github.com/TomokiMiyauci/mapcss/commit/8c32b7dc2c2f04efa2da353e8c3ac84e7b185f0b))
* **preset_tw:** add specifier for `backdrop-grayscale` ([f4df15d](https://github.com/TomokiMiyauci/mapcss/commit/f4df15d3d9ef80aa876481a635060b0c7b79860b))
* **preset_tw:** add specifier for `backdrop-hue-rotate` ([fdd541f](https://github.com/TomokiMiyauci/mapcss/commit/fdd541fbce58b9b94eb0a2cdc860067a9f97d997))
* **preset_tw:** add specifier for `backdrop-invert` ([96fa191](https://github.com/TomokiMiyauci/mapcss/commit/96fa191fa2fe7dd4f329e2201d842c7670068dc0))
* **preset_tw:** add specifier for `backdrop-saturate` ([45b0838](https://github.com/TomokiMiyauci/mapcss/commit/45b0838882ca77846739b1589f90538af1d19ab5))
* **preset_tw:** add specifier for `backdrop-sepia` ([c6c82fe](https://github.com/TomokiMiyauci/mapcss/commit/c6c82fe19ed057a4949efa958bb40aac2929dba0))
* **preset_tw:** add specifier of `backdrop-opacity` ([4d7d1c2](https://github.com/TomokiMiyauci/mapcss/commit/4d7d1c234656badb7dc894a7216213f8d4d5a4db))
* **preset_tw:** add specifier of `brightness` ([19cb875](https://github.com/TomokiMiyauci/mapcss/commit/19cb875d348abfe3457655c18d67ee561c450688))
* **preset_tw:** add specifier of `contrast` ([59eec4d](https://github.com/TomokiMiyauci/mapcss/commit/59eec4d6d9c0defb27bd403436b813f96f688387))
* **preset_tw:** add specifier of `drop-shadow` ([7f6a215](https://github.com/TomokiMiyauci/mapcss/commit/7f6a215a77d2ef2a4abc606fac2d6bb6cec0ef2d))
* **preset_tw:** add specifier of `grayscale` ([9000ebe](https://github.com/TomokiMiyauci/mapcss/commit/9000ebe32e31c6b8eda60e5e1163b9ca54fb7d30))
* **preset_tw:** add specifier of `hue-rotate` ([a91a017](https://github.com/TomokiMiyauci/mapcss/commit/a91a017829f5e2b66b4b167686bb26aa75c075d2))
* **preset_tw:** add specifier of `invert` ([2f20103](https://github.com/TomokiMiyauci/mapcss/commit/2f20103572f0479663392a9bf3d8d6acbb923f1b))
* **preset_tw:** add specifier of `saturate` ([382a1f1](https://github.com/TomokiMiyauci/mapcss/commit/382a1f12a8414eb2233314756e8da0a43d19ef2b))

# [1.0.0-beta.6](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2022-02-07)


### Features

* **core:** expand interface of specifier what accept function ([6e65d82](https://github.com/TomokiMiyauci/mapcss/commit/6e65d82a3a06b574c4899e4e18f4fc2e145ca36e))
* **preset_tw:** add specifier for `background-attachment` ([9707323](https://github.com/TomokiMiyauci/mapcss/commit/9707323eb44d2a8a24fe8f8c9c7fbecb032a0f8d))
* **preset_tw:** add specifier for `background-blend-mode` ([5537331](https://github.com/TomokiMiyauci/mapcss/commit/5537331ff75f0e395bb4438db0b95cda7273b7b0))
* **preset_tw:** add specifier for `background-image` ([3ca87ca](https://github.com/TomokiMiyauci/mapcss/commit/3ca87ca8effb085d37073906430c3084b422c069))
* **preset_tw:** add specifier for `background-origin` ([96e6cd5](https://github.com/TomokiMiyauci/mapcss/commit/96e6cd5d34aac16037a829d1178fc6d0563d6110))
* **preset_tw:** add specifier for `background-position` ([b184b58](https://github.com/TomokiMiyauci/mapcss/commit/b184b58bd460a1c89b08aa21cdec0a24738691e0))
* **preset_tw:** add specifier for `background-repeat` ([ad01911](https://github.com/TomokiMiyauci/mapcss/commit/ad019117bcc6052949b6d97d1c32ba23f8ee4e28))
* **preset_tw:** add specifier for `background-size` ([f82f9ce](https://github.com/TomokiMiyauci/mapcss/commit/f82f9ce2e10f387e4765766dc3e8ecf9db22b449))
* **preset_tw:** add specifier for `font-variant-numeric` ([3aa2870](https://github.com/TomokiMiyauci/mapcss/commit/3aa2870563673075d7ed6b14d22f2c923b4d355b))
* **preset_tw:** add specifier for `list-style-position` ([68f5b71](https://github.com/TomokiMiyauci/mapcss/commit/68f5b71229c8ec32f87f45d1bf3373d983b8e713))
* **preset_tw:** add specifier for `list-style-type` ([cf5ffdc](https://github.com/TomokiMiyauci/mapcss/commit/cf5ffdc55cbedac4af96e584bce81f80673d2d1b))
* **preset_tw:** add specifier for `place-content` ([b8243db](https://github.com/TomokiMiyauci/mapcss/commit/b8243db2a6097a9fa02724b1a9d9250abc465247))
* **preset_tw:** add specifier for `place-items` ([c9469e3](https://github.com/TomokiMiyauci/mapcss/commit/c9469e34c7ac266e22a33654823a1e9526502b53))
* **preset_tw:** add specifier for `place-self` ([59a5d15](https://github.com/TomokiMiyauci/mapcss/commit/59a5d150cf295c1d495839d3e235232e12b8217c))
* **preset_tw:** add specifier for `text-decoration-style` ([4bad1f0](https://github.com/TomokiMiyauci/mapcss/commit/4bad1f0926b9d05d6bebd11f8638952260136ab4))
* **preset_tw:** add specifier for `text-decoration-thickness` ([c5467c8](https://github.com/TomokiMiyauci/mapcss/commit/c5467c80d2e1ed1846d3a45597398c3de9d350a6))
* **preset_tw:** add specifier for `text-overflow` ([363afd4](https://github.com/TomokiMiyauci/mapcss/commit/363afd4f788f734f1b5aa935e9ac9b80431e0cdf))
* **preset_tw:** add specifier for `text-transform` ([f9ec9b1](https://github.com/TomokiMiyauci/mapcss/commit/f9ec9b16a4b8bc3d0a6448303c128a004fa5ec0c))
* **preset_tw:** add specifier for `text-underline-offset` ([c1b7a2a](https://github.com/TomokiMiyauci/mapcss/commit/c1b7a2ad5a3dd553727b44c7ca4352ed41a02384))
* **preset_tw:** add specifier of `background-clip` ([f2df6d1](https://github.com/TomokiMiyauci/mapcss/commit/f2df6d1b67cb911736e5b365deebb280bb0e0c85))
* **preset_tw:** add specifier of `blur` ([6406eb5](https://github.com/TomokiMiyauci/mapcss/commit/6406eb5cef0cc98eb361706adc92020b5dffab30))
* **preset_tw:** add specifier of `indent` ([8ff5723](https://github.com/TomokiMiyauci/mapcss/commit/8ff5723d130f911c54dcbb3b045231c4c151c1a1))
* **preset_tw:** add specifier of `mix` ([ca44680](https://github.com/TomokiMiyauci/mapcss/commit/ca44680ddc2e6339d276552bc1863fa7960bbc0d))
* **preset_tw:** add specifier of `ring-offset-*` ([5a33a77](https://github.com/TomokiMiyauci/mapcss/commit/5a33a7717a68dfb1546f8266c38a0e1ebbcbfea1))
* **preset_tw:** add specifier of `ring` ([2bbf5ed](https://github.com/TomokiMiyauci/mapcss/commit/2bbf5ed258412b7d69fc017eb9ddc49df29bf13c))

# [1.0.0-beta.5](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2022-02-07)


### Features

* **core:** change specifier object to define combinator ([de10ae0](https://github.com/TomokiMiyauci/mapcss/commit/de10ae0e996fdf65c193580385a627188a75897c))
* **core:** expand specifier interface that accept function ([1c2f4a2](https://github.com/TomokiMiyauci/mapcss/commit/1c2f4a216043989e7c24d19af63511135b004d81))
* **core:** pass variablePrefix as context ([fbc34d8](https://github.com/TomokiMiyauci/mapcss/commit/fbc34d8b8f54675cdcac9091f3d02ff42003ee00))
* **preset_tw:** add specifier for `border-color` ([1cd5fb9](https://github.com/TomokiMiyauci/mapcss/commit/1cd5fb9f2c65cc39f4dc3b7a8c791d586ea2c75c))
* **preset_tw:** add specifier for `border-left/right-width` ([999da1d](https://github.com/TomokiMiyauci/mapcss/commit/999da1d3ffd03f69d7c746330322db1fb5c70239))
* **preset_tw:** add specifier for `border-style` ([3049f91](https://github.com/TomokiMiyauci/mapcss/commit/3049f91d7dc9db64529574a510147d42901bdd08))
* **preset_tw:** add specifier for `border-top/bottom-width` ([36f4f64](https://github.com/TomokiMiyauci/mapcss/commit/36f4f6478eed6ad743c05cb092dca356a9e94d0b))
* **preset_tw:** add specifier for `grid-auto-flow` ([2f94176](https://github.com/TomokiMiyauci/mapcss/commit/2f941763b570eaf8f76b56c3a90a4a71a956ceca))
* **preset_tw:** add specifier for `grid-auto-rows` ([e6e8d04](https://github.com/TomokiMiyauci/mapcss/commit/e6e8d043164d247f8be25ad55ad4f9a6bf921ebc))
* **preset_tw:** add specifier for `grid-template-columns` ([9892301](https://github.com/TomokiMiyauci/mapcss/commit/9892301c3b43cffec0d1cdbfcdc05593176c51ae))
* **preset_tw:** add specifier for `grid-template-rows` ([b6f75dd](https://github.com/TomokiMiyauci/mapcss/commit/b6f75dd74b96acba545df7e81e27dc125dbf821b))
* **preset_tw:** add specifier for flex-direction ([1cab29a](https://github.com/TomokiMiyauci/mapcss/commit/1cab29a379409c2f205f7831771523490d45efda))
* **preset_tw:** add specifier for flex-wrap ([94cecd2](https://github.com/TomokiMiyauci/mapcss/commit/94cecd2265d92fb6c1687c45b91f3b94e3f00941))
* **preset_tw:** add specifier of `auto` ([726fe1f](https://github.com/TomokiMiyauci/mapcss/commit/726fe1f5158b71fff993f824f35c989dde39f741))
* **preset_tw:** add specifier of `basis` ([684a5b9](https://github.com/TomokiMiyauci/mapcss/commit/684a5b9187c092ce1aaddeed1109113a401101c4))
* **preset_tw:** add specifier of `col` ([61172e9](https://github.com/TomokiMiyauci/mapcss/commit/61172e958019423390766d80cbafa92d06933fd6))
* **preset_tw:** add specifier of `gap` ([2e44404](https://github.com/TomokiMiyauci/mapcss/commit/2e444042d7816b62a451e117f88bd466f6ca2c82))
* **preset_tw:** add specifier of `grow` ([7c25bff](https://github.com/TomokiMiyauci/mapcss/commit/7c25bffb8fe766f3f57d86f9d86784523187794c))
* **preset_tw:** add specifier of `order` ([f214b68](https://github.com/TomokiMiyauci/mapcss/commit/f214b6856d71af7c897801cf276a1209e527ecfb))
* **preset_tw:** add specifier of `row` ([5fc16b2](https://github.com/TomokiMiyauci/mapcss/commit/5fc16b2aa56409fd7f98802e01b87bdd307b2e78))
* **preset_tw:** add specifier of `shadow` ([7363922](https://github.com/TomokiMiyauci/mapcss/commit/7363922d06b50b1d7554f4f3519079eba5dc10a8))
* **preset_tw:** add specifier of `shrink` ([ccbbf0e](https://github.com/TomokiMiyauci/mapcss/commit/ccbbf0e8d50332f736c4f97ddc1c345e19b385fa))
* **preset_tw:** add specifier of `space` ([c23faab](https://github.com/TomokiMiyauci/mapcss/commit/c23faabc5c8c186ac8c4f54fa1de49d4fb196d82))

# [1.0.0-beta.4](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2022-02-05)


### Bug Fixes

* **preset_tw:** change syntax interface ([7c34c3e](https://github.com/TomokiMiyauci/mapcss/commit/7c34c3e20d665996672d4d7bd816ecb1927559ed))


### Features

* **core:** `generate` function accept string, when give string, extractor will extract tokens ([59c42a2](https://github.com/TomokiMiyauci/mapcss/commit/59c42a29af07ae4d833c9ccc6f2bd05eb5b41517))
* **core:** add local modifier resolution ([9228815](https://github.com/TomokiMiyauci/mapcss/commit/922881509b0a74c592ca8407dc015a3b201cb4fc))
* **core:** add resolver of config ([5c1f08c](https://github.com/TomokiMiyauci/mapcss/commit/5c1f08cedf8902a3a8454e715e8d8751f496348a))
* **preset_tw:** add arbitary rule to `inset` ([05225d2](https://github.com/TomokiMiyauci/mapcss/commit/05225d292e7de4901678315cd4257889bf9d330f))
* **preset_tw:** add arbitrary rule to `w` ([c6ae493](https://github.com/TomokiMiyauci/mapcss/commit/c6ae4939af0b427b39d440324ef2317ce00cf8ef))
* **preset_tw:** add generic modifier for pseudo ([335dba6](https://github.com/TomokiMiyauci/mapcss/commit/335dba6258eeabe0e765b3e2fa7b0c824179eab8))
* **preset_tw:** add global modifier of `webkit-scrollbar-thumb` ([7c06a35](https://github.com/TomokiMiyauci/mapcss/commit/7c06a35fa963094905f6e25c2c7bc1c036224544))
* **preset_tw:** add global modifier of `webkit-scrollbar-track` ([a46bbcb](https://github.com/TomokiMiyauci/mapcss/commit/a46bbcb72ca39984a2633981830c127239cc1243))
* **preset_tw:** add global modifier of `webkit-scrollbar` ([bb8bccd](https://github.com/TomokiMiyauci/mapcss/commit/bb8bccdbcd1a9b754eb1b644dc42dce9287bc884))
* **preset_tw:** add inset mapper ([1ed572e](https://github.com/TomokiMiyauci/mapcss/commit/1ed572ef3cdf88f6f24c23ee1603823f6fecc4ab))
* **preset_tw:** add local modifier of `-` ([999529b](https://github.com/TomokiMiyauci/mapcss/commit/999529bffc58c4697dc8a57c952a299e8a38a9df))
* **preset_tw:** add local modifier of important ([2df2527](https://github.com/TomokiMiyauci/mapcss/commit/2df25275072b879a7569c0d90008bd00627a3fc2))
* **preset_tw:** add mapper for `opacity` ([37c4a64](https://github.com/TomokiMiyauci/mapcss/commit/37c4a6496bb7cee6ce01609678eafa7a2b3601af))
* **preset_tw:** add mapper for font-family ([275b577](https://github.com/TomokiMiyauci/mapcss/commit/275b57704b1154be9fd8e7eb34df8a3b2a65c480))
* **preset_tw:** add mapper for screen reader ([018b735](https://github.com/TomokiMiyauci/mapcss/commit/018b7353ad1d895f651f9f5cae0037703d17bf0c))
* **preset_tw:** add mapper of margin set ([6b3e5d1](https://github.com/TomokiMiyauci/mapcss/commit/6b3e5d1f2b8a72ed809c3fb03a31a97d3de206a6))
* **preset_tw:** add mapper of padding ([b6d7765](https://github.com/TomokiMiyauci/mapcss/commit/b6d77651f509d56b08a0ab646f0d5841e5bbb71b))
* **preset_tw:** add modifier for breakpoints ([64fe105](https://github.com/TomokiMiyauci/mapcss/commit/64fe1057adc57cafb0df2859f63096912e7a90b4))
* **preset_tw:** add modifier for media query ([f6ad68b](https://github.com/TomokiMiyauci/mapcss/commit/f6ad68bc62af85d4842cb9ff211ae25d5e39adb7))
* **preset_tw:** add modifier of `dark` ([ce74f74](https://github.com/TomokiMiyauci/mapcss/commit/ce74f74167ab9b4695c47dfe749090ea2c75ce77))
* **preset_tw:** add modifier of color theme `dark` ([c459ef4](https://github.com/TomokiMiyauci/mapcss/commit/c459ef42e74e0c10a58befa255666af4bb203c75))
* **preset_tw:** add modifier of pseudo of `focus` and `hover` ([2ab83be](https://github.com/TomokiMiyauci/mapcss/commit/2ab83be2b78285c28ba4165e8f3861fff5472774))
* **preset_tw:** add opacity of `border-color` ([7e052ca](https://github.com/TomokiMiyauci/mapcss/commit/7e052ca4a2b44f1d1d488fc5fe3101023d6c57ef))
* **preset_tw:** add syntax for tailwind basic ([7f9ffea](https://github.com/TomokiMiyauci/mapcss/commit/7f9ffea528ca41f48c24b699833293cda1c82005))
* **preset_tw:** change core engine to deep map accessor ([02fc1ef](https://github.com/TomokiMiyauci/mapcss/commit/02fc1efa4c33f77ed0b39c6425aab32ef4d4538e))
* rename mapper to specifier ([5680a2e](https://github.com/TomokiMiyauci/mapcss/commit/5680a2e75e440597cf47e0f057f24a7efb9354c9))

# [1.0.0-beta.3](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2022-01-31)


### Bug Fixes

* **preset_tw:** fix wrong css value ([15f57a6](https://github.com/TomokiMiyauci/mapcss/commit/15f57a602659aca8f4fd36b1f7f99cb402945e59))


### Features

* **preset_tw:** add rule of `border-collapse` ([30563ef](https://github.com/TomokiMiyauci/mapcss/commit/30563ef7d4b7b50c888bec469fac6a892375e6c5))
* **preset_tw:** add rule of `max-height` ([4b06f9e](https://github.com/TomokiMiyauci/mapcss/commit/4b06f9eae9d6697a19910436d50de7889f500f92))
* **preset_tw:** add rule of `vertical-align` ([f6cbd2c](https://github.com/TomokiMiyauci/mapcss/commit/f6cbd2c74d63798d66f1f6b9bb9258c441494486))
* **preset_tw:** add rule of `white-space` ([7ec64f6](https://github.com/TomokiMiyauci/mapcss/commit/7ec64f65dcacc08a301861604cf03d09ae429803))
* **preset_tw:** add rule of fontSmoothing ([a4b9cae](https://github.com/TomokiMiyauci/mapcss/commit/a4b9caed7ec859f06a8500f1cd6f63e4cd6e531e))

# [1.0.0-beta.2](https://github.com/TomokiMiyauci/mapcss/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2022-01-30)


### Bug Fixes

* **preset_tw:** remove break_before file, move to layout ([14d36be](https://github.com/TomokiMiyauci/mapcss/commit/14d36beb046daa4963ee61a5470a8cdc5bfc1a65))


### Features

* **preset_tw:** export sample for layout classes ([85e8940](https://github.com/TomokiMiyauci/mapcss/commit/85e89406dba4d61f0a0543052ebf692662394332))

# 1.0.0-beta.1 (2022-01-30)


### Bug Fixes

* **core:** change rule context interface ([84fbed2](https://github.com/TomokiMiyauci/mapcss/commit/84fbed2cbedbe7c8f7ff3f153ed7ff89d745427b))
* **core:** fix escape selector logic ([d1ac27d](https://github.com/TomokiMiyauci/mapcss/commit/d1ac27d1b9b091ba9d1eaebeabda04dedb518815))
* **core:** fix format of raw css and add test case ([7327d80](https://github.com/TomokiMiyauci/mapcss/commit/7327d80d965a529de60424ccbaf7df0079ac5407))
* **core:** remove defualt theme ([65d9dc8](https://github.com/TomokiMiyauci/mapcss/commit/65d9dc85fe2e0ea07d1e3f5b78747e0fe4b6cdca))
* **preset_mini:** change interface of rules what should have property name ([e577c14](https://github.com/TomokiMiyauci/mapcss/commit/e577c14881491c9627e389bf9f11d50fb24e346d))
* **preset_tw:** add `PresetTwTheme` interface ([f2ba583](https://github.com/TomokiMiyauci/mapcss/commit/f2ba5830a67f4b32a1f14d12462654a81234805e))
* **preset_tw:** add css variable to `color` ([014f5f6](https://github.com/TomokiMiyauci/mapcss/commit/014f5f6052526b69ee0ebfdfd50b8558c8e4e9df))
* **preset_tw:** convert hex to rgba `border-color` rule ([f99428a](https://github.com/TomokiMiyauci/mapcss/commit/f99428a1f78e14eaf6615ead3a0c222752342507))
* **preset_tw:** fix regex rule ([1442caa](https://github.com/TomokiMiyauci/mapcss/commit/1442caa89c73077cc2926556a840d84ac00c93cf))
* **preset_tw:** fix types of theme ([b75d9a5](https://github.com/TomokiMiyauci/mapcss/commit/b75d9a565fe4f22a0dd2e3dc75a49890e4adb662))


### Features

* **core:** add `generate` function that returns raw CSS ([a5148df](https://github.com/TomokiMiyauci/mapcss/commit/a5148df0818ed68f72c9c8ab5ca3561d6ca207a0))
* **core:** add feature of `modifier` and add breakpoint theme ([dc49c83](https://github.com/TomokiMiyauci/mapcss/commit/dc49c835f52763b9cad121588972d53d6d7905d6))
* **core:** add theme interface and pass theme object when rule is dynamic ([8ad0108](https://github.com/TomokiMiyauci/mapcss/commit/8ad010873dcc5f278a3fa2bcf9c040ceb702a007))
* **core:** change theme interface and add default prop of theme ([23beb53](https://github.com/TomokiMiyauci/mapcss/commit/23beb533075bb64f77dfcd656c8b15808ae578ef))
* **preset_mini:** add modifier of `dark` color scheme ([31464cf](https://github.com/TomokiMiyauci/mapcss/commit/31464cf34acbaf8e90f9875e9bd55c4e1bafaa59))
* **preset_mini:** add modifier of `focus` ([19b9a0e](https://github.com/TomokiMiyauci/mapcss/commit/19b9a0e1609311247260a2bc60c5c5ba259dd0cf))
* **preset_mini:** add modifier of `hover` ([698a4e8](https://github.com/TomokiMiyauci/mapcss/commit/698a4e8194fa2c176709a6c8e4a8660817fad20a))
* **preset_mini:** add preset for minimum properties ([e695112](https://github.com/TomokiMiyauci/mapcss/commit/e695112ffde66b540b34377d4a34d74838ebe83e))
* **preset_mini:** add rule of `background-color` ([0d63d1c](https://github.com/TomokiMiyauci/mapcss/commit/0d63d1c80fe797388fc39e4c65d1364e381d9fd7))
* **preset_mini:** add rule of `font-family` ([0475ac6](https://github.com/TomokiMiyauci/mapcss/commit/0475ac6ea88f91a1a10f332f1e1d49db16049e8c))
* **preset_mini:** add rule of `margin` ([11f67b4](https://github.com/TomokiMiyauci/mapcss/commit/11f67b4fd3c616a752a2571df9f515b987c16f08))
* **preset_mini:** add rule of `max-width` ([8c9dc93](https://github.com/TomokiMiyauci/mapcss/commit/8c9dc93edbc3bbb8fe669a2f90e7c8a6800de564))
* **preset_mini:** add rule of `outline-style` ([6611012](https://github.com/TomokiMiyauci/mapcss/commit/661101231088f920fa11eb657d8afe29bb38e5cb))
* **preset_mini:** add theme of `fontFamily` ([6c55615](https://github.com/TomokiMiyauci/mapcss/commit/6c55615377552d8ab3c255bde7c414ba6caa53a7))
* **preset_mini:** add theme of `fontSize` and add rule of `font-size` ([0057801](https://github.com/TomokiMiyauci/mapcss/commit/005780154186d21dfb5a13cb234f114e4a9616ed))
* **preset_mini:** add theme of `fontWeight` and rule of `font-weight` ([d5d152e](https://github.com/TomokiMiyauci/mapcss/commit/d5d152ef62b1e9c4a38966e74bd308955b75c30c))
* **preset_mini:** add theme of `letterSpacing` and add rule of `letter-spacing` ([23ad5a6](https://github.com/TomokiMiyauci/mapcss/commit/23ad5a6a473379d6f29cc659cbfa60731374420b))
* **preset_mini:** add theme of `margin` ([cc77c2c](https://github.com/TomokiMiyauci/mapcss/commit/cc77c2c689ac02ce7512aa086a73a51d06ef1b67))
* **preset_mini:** add theme of `maxWidth` ([5455a03](https://github.com/TomokiMiyauci/mapcss/commit/5455a035df3f2b824dc4156ffdf2f571ca0504cc))
* **preset_tw:** add attribute rule to `width` ([e06be29](https://github.com/TomokiMiyauci/mapcss/commit/e06be29111e11897ba980f5772d420d972a409e7))
* **preset_tw:** add background opacity to `background-color` rule ([ce2b119](https://github.com/TomokiMiyauci/mapcss/commit/ce2b11947cfe79a7a4c284cdee821b470589cc63))
* **preset_tw:** add opacity attribute to `border-color` ([1e6e6ce](https://github.com/TomokiMiyauci/mapcss/commit/1e6e6ce89472f2d7f34eecfc78d373d78c78a065))
* **preset_tw:** add opacity expression to `color` rule ([32208a0](https://github.com/TomokiMiyauci/mapcss/commit/32208a034e3214b47978451f7a805d5f27126a12))
* **preset_tw:** add rule of `border-color` ([1c5f9d3](https://github.com/TomokiMiyauci/mapcss/commit/1c5f9d30428c1f543d732ba319f564aa56de2ecb))
* **preset_tw:** add rule of `border-color` ([432ed94](https://github.com/TomokiMiyauci/mapcss/commit/432ed941fd646b5f9f7cd73b868dd33819e90bdb))
* **preset_tw:** add rule of `border-style` ([c8e4967](https://github.com/TomokiMiyauci/mapcss/commit/c8e49673b3abe875631c0dc5a8e041abf833d57e))
* **preset_tw:** add rule of `box-decoration-break` ([7a12e01](https://github.com/TomokiMiyauci/mapcss/commit/7a12e0105d380a83cc1482b44722861879a49658))
* **preset_tw:** add rule of `box-sizing` ([c4b00f1](https://github.com/TomokiMiyauci/mapcss/commit/c4b00f154d69f8a9e32d9c7f7bd6eb7429ecdf11))
* **preset_tw:** add rule of `break-after` ([e6cf09b](https://github.com/TomokiMiyauci/mapcss/commit/e6cf09be41755e392edab5e97b030f98f7532f7c))
* **preset_tw:** add rule of `break-before` ([83ad21a](https://github.com/TomokiMiyauci/mapcss/commit/83ad21a65f4d820b1733f595f306d57ba21a0a63))
* **preset_tw:** add rule of `break-inside` ([6a1cb04](https://github.com/TomokiMiyauci/mapcss/commit/6a1cb04d637878a8134e83d59e828bfc7072a8bf))
* **preset_tw:** add rule of `columns` ([b27ba6c](https://github.com/TomokiMiyauci/mapcss/commit/b27ba6cb0c065c4523f68fda6a782bbe50c44c53))
* **preset_tw:** add rule of `isolation` ([84f9a32](https://github.com/TomokiMiyauci/mapcss/commit/84f9a32d3d7f6ffd03ab52d753ed54a2e58f585d))
* **preset_tw:** add rule of `object-fit` ([070b301](https://github.com/TomokiMiyauci/mapcss/commit/070b30101aaf86cd3307502fa9c99e3a97fa7235))
* **preset_tw:** add rule of `object-position` ([3f6dfca](https://github.com/TomokiMiyauci/mapcss/commit/3f6dfca5be7c1f209aab97ea624e34d484362fdb))
* **preset_tw:** add rule of `outline-color` ([c86ef5a](https://github.com/TomokiMiyauci/mapcss/commit/c86ef5a44366c5683ea79b4a5b7be0de9f740e22))
* **preset_tw:** add rule of `outline-offset` ([e39644c](https://github.com/TomokiMiyauci/mapcss/commit/e39644c345c833503b27c358fc68ff0d2ad99f4e))
* **preset_tw:** add rule of `outline-width` ([3bf5353](https://github.com/TomokiMiyauci/mapcss/commit/3bf5353f308bbb6208ff45834b613d4aa77b75c0))
* **preset_tw:** add rule of `overflow` ([b40c6b0](https://github.com/TomokiMiyauci/mapcss/commit/b40c6b0b866173830777e8025d27b0428857a3d6))
* **preset_tw:** add rule of `overscroll-behavior` ([9114a4c](https://github.com/TomokiMiyauci/mapcss/commit/9114a4cb83816dca2cde106925506ded86f19d84))
* **preset_tw:** add rule of `width` ([efe9ca2](https://github.com/TomokiMiyauci/mapcss/commit/efe9ca2710c255b4ff7275bff064381cf49a0749))
* **preset_tw:** add theme of `borderRadius` and rule of `border-radius` ([810954b](https://github.com/TomokiMiyauci/mapcss/commit/810954b862b04c4640bc60f2f112f4b27c2802cc))
* **preset_tw:** add theme of `borderWidth` and add rule of `border-width` ([6476798](https://github.com/TomokiMiyauci/mapcss/commit/6476798226f0719601277a8442dbe89470bc5a91))
* **preset_tw:** add theme of `column` ([6e5bddb](https://github.com/TomokiMiyauci/mapcss/commit/6e5bddba08eefb36f5e5106685dc6dbc56feb904))
* **preset_tw:** add theme of `height` and add rule of `height` ([3d5490a](https://github.com/TomokiMiyauci/mapcss/commit/3d5490a1168c1287260d9f6f564d8f85a48193ea))
* **preset_tw:** add theme of `lineHeight` and add rule of `line-height` ([501b2ea](https://github.com/TomokiMiyauci/mapcss/commit/501b2ea7c0e4129cab58c78692dbae45b167c9dc))
* **preset_tw:** add theme of `maxWidth` and rule of `max-width` ([7026073](https://github.com/TomokiMiyauci/mapcss/commit/702607380f11727be05792d7fb19a326d270a405))
* **preset_tw:** add theme of `minWidth` and rule of `min-width` ([276d21e](https://github.com/TomokiMiyauci/mapcss/commit/276d21e63b9fce4b18f1d477d55a3abdb7592eb3))
* **preset_tw:** add theme of `objectPosition` ([08128f3](https://github.com/TomokiMiyauci/mapcss/commit/08128f34e45b55fa089217f3ceea86a2d4113e84))
* **preset_tw:** add theme of `padding` and add rule of `padding` ([b4b3ea3](https://github.com/TomokiMiyauci/mapcss/commit/b4b3ea30b56290bfedf9d02e06569250efb54c29))
* **preset_tw:** add theme of `width` ([42eded6](https://github.com/TomokiMiyauci/mapcss/commit/42eded6b57727f3735365b82727e1b4b83accac7))
* **preset_tw:** change style of `color` hex-color to RBBA ([dcbbd50](https://github.com/TomokiMiyauci/mapcss/commit/dcbbd5083b760902d55ae2131d967d65366eb8f2))
* **reset:** add tailwind reset css ([96fe50c](https://github.com/TomokiMiyauci/mapcss/commit/96fe50c29edf5683c27921ef46f0d989e35a2378))

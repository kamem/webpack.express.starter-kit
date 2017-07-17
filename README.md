webpack.express.starter-kit


## メインアプリケーション（Webサーバー）を起動。  
  
```bash
npm start
```
[http://localhost:3142/](
http://localhost:3142/)

### Build

ビルドのみを実行し `bundle.js` を生成する場合（本番用）

```bash
npm run build
```


## 設定まわり

### .editorconfig
http://editorconfig.org/

エディターのインデントなどの設定を合わせる。 
各エディタに合わせてプラグインをインストールする必要があります。


## 環境まわりの説明

環境設定部分の躓いた部分や、どういう構成で動いているのかを書いています。

package.jsonで使ってるライブラリについてなどかいていきます。

### 構成


```bash
npm run dev
npm run dev:lint
```

#### js監視用
で下記全てを実行しています。


```bash
npm run start-dev
npm run start-dev:lint
```
[http://localhost:1341/js/bundle.js](
http://localhost:1341/js/bundle.js)

※ :lintの場合（process.env.LINT === 'true'）はwebpackの``eslint-loader``を使って監視するようになっています。


このjsを``dev``環境のときだけ読み込むようにしています。
下記のようにejsなどを使ってNODE_ENVの起動時の値によって切り分けています。

```ejs:footer.ejs
<% if (env === 'development') { %>
<script src="//localhost:1341/js/bundle.js"></script>
<% } else { %>
<script src="js/bundle.js"></script>
<% } %>
```

[webpackのHot Module ReplacementでWebフロントエンドを爆速開発](http://qiita.com/sergeant-wizard/items/60b557fc1c763f0a1531)


#### 実際のサーバー
```bash
start-server:prd
start-server:dev
```
[http://localhost:3141/](
http://localhost:3141/)

portは``server/settings.js``内に書いてます


#### browser-sync

```bash
npm run browser-sync
```

``ev/browser-sync.js``をもとに、bundle.jsに関係ないpostcssなどのファイルが更新された際に自動反映するサーバーを立てています。

``server/settings.js``内のportに ``+1``したportで実際の作業用のサーバーが立ち上がります。
実際には[http://localhost:3141/](http://localhost:3141/)の内容をproxyしています。

[http://localhost:3142/](
http://localhost:3142/)


### eslint 

```
"lint:src": "eslint ./src --fix",
"lint:server": "eslint ./server --fix",
```

``src``がフロント側、``server``がバックエンド側のeslintを実行します。
``npm run dev:lint``を実行するとまとめて2つとも実行されます。



### webpack

``webpack-dev-server.express.js``で、開発環境用の``bundle.js``をリロードなしで反映されるように
``webpack-dev-middleware``と``webpack-hot-middleware``を使って監視サーバーを立てています。


``webpack.app.config.js``で設定を行っています。

```javascript:webpack.app.config.js
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...
    
    
  loaders: [
    {
      loaders: [
        'react-hot-loader',
        'babel-loader'
      ],
      
      ...
```

webpack側でのhot reloadの設定と合わせて.babel側にも記述しています。

```javascript:.babelrc
  "env": {
    "development": {
      "plugins": [
        ["react-transform",
          {
            "transforms": [
              {
                "transform": "react-transform-hmr",
                "imports": ["react"],
                "locals": ["module"]
              },
              {
                "transform": "react-transform-catch-errors",
                "imports": ["react", "redbox-react"]
              }
            ]
          }
        ]
      ]
    }
  }
```

##### 参考

* [webpack, React Hot Loader + Browsersync でクロスブラウジング+ホットリロード開発](http://uraway.hatenablog.com/entry/2016/03/25/034706)

* [React Hot Loaderで開発をさらに加速する](https://blog.isao.co.jp/react-hot-loader/)

* [webpackのHot Module ReplacementでWebフロントエンドを爆速開発](http://qiita.com/sergeant-wizard/items/60b557fc1c763f0a1531)

#### webpack 3.0.0を使うにあたり
* ``OccurenceOrderPlugin``の名前が``OccurrenceOrderPlugin``に変更されてるなどの地味な変更があり注意
* ``module:{postcss: function(){}}``のようにmodule内にpostcssを描く書き方でエラーが表示される

https://github.com/postcss/postcss-loader/issues/92

下記のようにpluginsとして追加することで回避する。

```javascript:webpack.app.config.js
plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          require('autoprefixer'),
          require('precss')
        ]
      }
    })
]
```


#### postcss

```bash
npm run postcss
```

``postcss.config.js``に使いたいプラグインを記述しています。


precssを使いたいと思ったのですが、postcss-cliを使った場合に
importで読み込まれてる先のファイルを編集した際にwatchが発動しなかったため、
``postcss-import``を使うようにして個別で使いたいプラグインを読み込んでいます。


#### nodemonを使った場合のserver側のeslintについて

```bash
npm run start-server:dev


NODE_ENV=development nodemon -r babel-register --watch server -e js,ejs bin/www --exec 'npm run lint:server && node'
```

``--exec 'npm run lint:server && node'``を設定することによりlintが通らないと実行されないようになっています。



##### 参考

* [how to do linting using nodemon?](https://stackoverflow.com/questions/34588458/how-to-do-linting-using-nodemon)

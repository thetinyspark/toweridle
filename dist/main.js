/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/common/model/node/GameNode.js":
/*!********************************************!*\
  !*** ./dist/common/model/node/GameNode.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass GameNode {\r\n    id = \"\";\r\n    state = {};\r\n}\r\nexports[\"default\"] = GameNode;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/common/model/node/GameNode.js?");

/***/ }),

/***/ "./dist/common/model/node/index.js":
/*!*****************************************!*\
  !*** ./dist/common/model/node/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.GameNode = void 0;\r\nconst GameNode_1 = __webpack_require__(/*! ./GameNode */ \"./dist/common/model/node/GameNode.js\");\r\nexports.GameNode = GameNode_1.default;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/common/model/node/index.js?");

/***/ }),

/***/ "./dist/common/model/space/partitioning/grid/Grid2D.js":
/*!*************************************************************!*\
  !*** ./dist/common/model/space/partitioning/grid/Grid2D.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Grid2D {\r\n    _map = [];\r\n    _numRows = 0;\r\n    _numCols = 0;\r\n    constructor() { }\r\n    reset(rows, cols) {\r\n        this._numRows = rows;\r\n        this._numCols = cols;\r\n        this._map = [];\r\n        for (let i = 0; i < rows; i++) {\r\n            const col = [];\r\n            for (let j = 0; j < cols; j++) {\r\n                col.push(null);\r\n            }\r\n            this._map.push(col);\r\n        }\r\n    }\r\n    destroy() {\r\n        this._map = [];\r\n        this._numRows = 0;\r\n        this._numCols = 0;\r\n    }\r\n    getNeighbours(row, col) {\r\n        return {\r\n            topLeft: this.getTopLeft(row, col),\r\n            top: this.getTop(row, col),\r\n            topRight: this.getTopRight(row, col),\r\n            left: this.getLeft(row, col),\r\n            center: this.getAt(row, col),\r\n            right: this.getRight(row, col),\r\n            bottomLeft: this.getBottomLeft(row, col),\r\n            bottom: this.getBottom(row, col),\r\n            bottomRight: this.getBottomRight(row, col),\r\n        };\r\n    }\r\n    getLeft(row, col) {\r\n        return this.getAt(row, col - 1);\r\n    }\r\n    getRight(row, col) {\r\n        return this.getAt(row, col + 1);\r\n    }\r\n    getBottom(row, col) {\r\n        return this.getAt(row + 1, col);\r\n    }\r\n    getBottomLeft(row, col) {\r\n        return this.getAt(row + 1, col - 1);\r\n    }\r\n    getBottomRight(row, col) {\r\n        return this.getAt(row + 1, col + 1);\r\n    }\r\n    getTop(row, col) {\r\n        return this.getAt(row - 1, col);\r\n    }\r\n    getTopLeft(row, col) {\r\n        return this.getAt(row - 1, col - 1);\r\n    }\r\n    getTopRight(row, col) {\r\n        return this.getAt(row - 1, col + 1);\r\n    }\r\n    getAt(row, col) {\r\n        if (this.isOutOfBounds(row, col))\r\n            return null;\r\n        return this._map[row][col];\r\n    }\r\n    addAt(row, col, value) {\r\n        if (this.isOutOfBounds(row, col))\r\n            return;\r\n        this._map[row][col] = value;\r\n    }\r\n    removeAt(row, col) {\r\n        if (this.isOutOfBounds(row, col))\r\n            return;\r\n        this._map[row][col] = null;\r\n    }\r\n    isOutOfBounds(row, col) {\r\n        return (row > this.numRows - 1 || col > this.numCols - 1 || row < 0 || col < 0);\r\n    }\r\n    forEach(func) {\r\n        for (let i = 0; i < this.numRows; i++) {\r\n            for (let j = 0; j < this.numCols; j++) {\r\n                func(this._map[i][j], i, j);\r\n            }\r\n        }\r\n    }\r\n    map(func) {\r\n        const data = [];\r\n        for (let i = 0; i < this.numRows; i++) {\r\n            data[i] = [];\r\n            for (let j = 0; j < this.numCols; j++) {\r\n                data[i][j] = func(this._map[i][j], i, j);\r\n            }\r\n        }\r\n        return Grid2D.from(data);\r\n    }\r\n    extract(fromRow, toRow, fromCol, toCol) {\r\n        const data = [];\r\n        toRow = toRow > this.numRows - 1 ? this.numRows - 1 : toRow;\r\n        toCol = toCol > this.numCols - 1 ? this.numCols - 1 : toCol;\r\n        fromRow = fromRow < 0 ? 0 : fromRow;\r\n        fromCol = fromCol < 0 ? 0 : fromCol;\r\n        for (let i = fromRow; i <= toRow; i++) {\r\n            const row = [];\r\n            for (let j = fromCol; j <= toCol; j++) {\r\n                row.push(this.getAt(i, j));\r\n            }\r\n            data.push(row);\r\n        }\r\n        return Grid2D.from(data);\r\n    }\r\n    get numCols() {\r\n        return this._numCols;\r\n    }\r\n    get numRows() {\r\n        return this._numRows;\r\n    }\r\n    get data() {\r\n        return this._map;\r\n    }\r\n    static from(data) {\r\n        const grid = new Grid2D();\r\n        const rows = data.length;\r\n        const cols = data[0]?.length || 0;\r\n        grid.reset(rows, cols);\r\n        for (let i = 0; i < rows; i++) {\r\n            for (let j = 0; j < cols; j++) {\r\n                grid.addAt(i, j, data[i][j]);\r\n            }\r\n        }\r\n        return grid;\r\n    }\r\n}\r\nexports[\"default\"] = Grid2D;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/common/model/space/partitioning/grid/Grid2D.js?");

/***/ }),

/***/ "./dist/common/model/space/partitioning/grid/index.js":
/*!************************************************************!*\
  !*** ./dist/common/model/space/partitioning/grid/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Grid2D = void 0;\r\nconst Grid2D_1 = __webpack_require__(/*! ./Grid2D */ \"./dist/common/model/space/partitioning/grid/Grid2D.js\");\r\nexports.Grid2D = Grid2D_1.default;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/common/model/space/partitioning/grid/index.js?");

/***/ }),

/***/ "./dist/common/utils/Maze2D.js":
/*!*************************************!*\
  !*** ./dist/common/utils/Maze2D.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst grid_1 = __webpack_require__(/*! ../model/space/partitioning/grid */ \"./dist/common/model/space/partitioning/grid/index.js\");\r\nconst node_1 = __webpack_require__(/*! ../model/node */ \"./dist/common/model/node/index.js\");\r\nconst MazeNodeType_1 = __webpack_require__(/*! ./MazeNodeType */ \"./dist/common/utils/MazeNodeType.js\");\r\nclass Maze2D {\r\n    _grid = null;\r\n    _pathCoords;\r\n    _currentRow = 0;\r\n    _currentCol = 0;\r\n    reset(rows, cols, startRow, startCol) {\r\n        this._pathCoords = [];\r\n        this._grid = new grid_1.Grid2D();\r\n        this._grid.reset(rows, cols);\r\n        this._currentRow = startRow;\r\n        this._currentCol = startCol;\r\n        this._grid.forEach((value, row, col) => {\r\n            const node = new node_1.GameNode();\r\n            node.state.type = (row % 2 == 0 || col % 2 == 0) ? MazeNodeType_1.default.WALL : MazeNodeType_1.default.BLOCK;\r\n            this._grid.addAt(row, col, node);\r\n        });\r\n    }\r\n    getRows() {\r\n        return this._grid.numRows;\r\n    }\r\n    getCols() {\r\n        return this._grid.numCols;\r\n    }\r\n    getCurrentNode() {\r\n        return this._grid.getAt(this._currentRow, this._currentCol);\r\n    }\r\n    getData() {\r\n        return this._grid.data;\r\n    }\r\n    isFinished() {\r\n        return this._currentRow === null && this._currentCol === null;\r\n    }\r\n    finalize() {\r\n        while (!this.isFinished()) {\r\n            this.step();\r\n        }\r\n    }\r\n    step() {\r\n        if (this.isFinished())\r\n            return;\r\n        const grid = this._grid;\r\n        const path = this._pathCoords;\r\n        const row = this._currentRow;\r\n        const col = this._currentCol;\r\n        // on passe notre case courante à FREE (libre)\r\n        grid.getAt(row, col).state.type = MazeNodeType_1.default.FREE;\r\n        // on récupère tous les voisins et les murs qui nous en séparent\r\n        const neighbours = [\r\n            {\r\n                wall: this._grid.getLeft(row, col),\r\n                target: this._grid.getLeft(row, col - 1),\r\n                row: row,\r\n                col: col - 2\r\n            },\r\n            {\r\n                wall: this._grid.getRight(row, col),\r\n                target: this._grid.getRight(row, col + 1),\r\n                row: row,\r\n                col: col + 2\r\n            },\r\n            {\r\n                wall: this._grid.getTop(row, col),\r\n                target: this._grid.getTop(row - 1, col),\r\n                row: row - 2,\r\n                col: col\r\n            },\r\n            {\r\n                wall: this._grid.getBottom(row, col),\r\n                target: this._grid.getBottom(row + 1, col),\r\n                row: row + 2,\r\n                col: col\r\n            }\r\n        ].filter((value) => {\r\n            return value.wall !== null && value.target !== null && value.target.state.type === MazeNodeType_1.default.BLOCK;\r\n        });\r\n        if (neighbours.length > 0) {\r\n            // on récupère un voisin au hasard\r\n            const index = Math.round(Math.random() * (neighbours.length - 1));\r\n            const current = neighbours[index];\r\n            // alors on fait en sorte de passer le mur qui nous sépare du voisin à FREE\r\n            current.wall.state.type = MazeNodeType_1.default.FREE;\r\n            // on passe notre voisin a FREE aussi\r\n            current.target.state.type = MazeNodeType_1.default.FREE;\r\n            // on ajoute nos coordonnées de départ au chemin \r\n            // qui nous a mené jusqu'à la nouvelle case\r\n            path.push([row, col]);\r\n            // on spécifie notre prochain point de départ\r\n            this._currentRow = current.row;\r\n            this._currentCol = current.col;\r\n        }\r\n        else if (path.length > 0) {\r\n            // si aucune case adjacente n'est intéréssante, alors on remonte le chemin\r\n            // à rebours et on tente de \"creuser\" à partir d'une des cases précédentes\r\n            // on retire le dernier élément du chemin\r\n            let coords = path.pop();\r\n            // on spécifie notre prochain point de départ\r\n            this._currentRow = coords[0];\r\n            this._currentCol = coords[1];\r\n        }\r\n        else {\r\n            // C'est fini\r\n            this._currentRow = null;\r\n            this._currentCol = null;\r\n        }\r\n    }\r\n}\r\nexports[\"default\"] = Maze2D;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/common/utils/Maze2D.js?");

/***/ }),

/***/ "./dist/common/utils/MazeNodeType.js":
/*!*******************************************!*\
  !*** ./dist/common/utils/MazeNodeType.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar MazeNodeType;\r\n(function (MazeNodeType) {\r\n    MazeNodeType[\"WALL\"] = \"WALL\";\r\n    MazeNodeType[\"FREE\"] = \"FREE\";\r\n    MazeNodeType[\"BLOCK\"] = \"BLOCK\";\r\n})(MazeNodeType || (MazeNodeType = {}));\r\nexports[\"default\"] = MazeNodeType;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/common/utils/MazeNodeType.js?");

/***/ }),

/***/ "./dist/common/utils/PathFinder2D.js":
/*!*******************************************!*\
  !*** ./dist/common/utils/PathFinder2D.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.NODE_DISTANCE_VALUE = void 0;\r\nconst grid_1 = __webpack_require__(/*! ../../common/model/space/partitioning/grid */ \"./dist/common/model/space/partitioning/grid/index.js\");\r\nconst node_1 = __webpack_require__(/*! ../model/node */ \"./dist/common/model/node/index.js\");\r\nclass PathFinder2D {\r\n    opened = [];\r\n    closed = [];\r\n    createGraphe(grid, walkableValue) {\r\n        const graphe = new grid_1.Grid2D();\r\n        graphe.reset(grid.numRows, grid.numCols);\r\n        grid.forEach((value, row, col) => {\r\n            const node = new node_1.GameNode();\r\n            node.state.row = row;\r\n            node.state.col = col;\r\n            node.state.g = 0;\r\n            node.state.f = 0;\r\n            node.state.h = 0;\r\n            node.state.walkable = value === walkableValue;\r\n            node.state.parent = null;\r\n            graphe.addAt(row, col, node);\r\n        });\r\n        return graphe;\r\n    }\r\n    resetGraphe(graphe) {\r\n        this.opened = new Array();\r\n        this.closed = new Array();\r\n        graphe.forEach((node, row, col) => {\r\n            if (node) {\r\n                node.state.row = row;\r\n                node.state.col = col;\r\n                node.state.g = 0;\r\n                node.state.f = 0;\r\n                node.state.h = 0;\r\n                node.state.parent = null;\r\n            }\r\n        });\r\n    }\r\n    findPath(graphe, startNode, endNode, allowDiagonals = false) {\r\n        // on crée les listes fermées et les listes ouvertes\r\n        this.opened = new Array();\r\n        this.closed = new Array();\r\n        // - Ajout du node de départ à la liste ouverte.\r\n        this._addToOpenList(startNode);\r\n        //  stopper la boucle si la liste ouverte est vide\r\n        let hasNextStep = true;\r\n        while (hasNextStep) {\r\n            // a. Récupération du node avec le plus petit F contenu dans la liste ouverte. \r\n            // On le nommera CURRENT.\r\n            this.opened.sort((a, b) => a.state.f < b.state.f ? -1 : 1);\r\n            //  stopper la méthode si le liste ouverte est vide ou si le prochain noeud est le noeud d'arrivée\r\n            if (this.opened.length === 0 || this.opened[0] === endNode) {\r\n                hasNextStep = false;\r\n                break;\r\n            }\r\n            const currentNode = this.opened[0];\r\n            // b. Basculer CURRENT dans la liste fermée.\r\n            this._addToCloseList(currentNode);\r\n            //  récupération des voisins de CURRENT\r\n            const neighbours = [\r\n                graphe.getLeft(currentNode.state.row, currentNode.state.col),\r\n                graphe.getRight(currentNode.state.row, currentNode.state.col),\r\n                graphe.getTop(currentNode.state.row, currentNode.state.col),\r\n                graphe.getBottom(currentNode.state.row, currentNode.state.col),\r\n            ];\r\n            if (allowDiagonals) {\r\n                neighbours.push(graphe.getTopLeft(currentNode.state.row, currentNode.state.col), graphe.getTopRight(currentNode.state.row, currentNode.state.col), graphe.getBottomLeft(currentNode.state.row, currentNode.state.col), graphe.getBottomRight(currentNode.state.row, currentNode.state.col));\r\n            }\r\n            // we remove non existing neighbours\r\n            const nonEmpty = neighbours.filter(node => node !== null);\r\n            // Pour chacun des nodes adjacents à CURRENT appliquer la méthode suivante:\r\n            nonEmpty.forEach((node) => {\r\n                //Si le node est un obstacle ou est dans la liste fermée ignorez-le et passer à l'analyse d'un autre node.\r\n                if (this._isOnCloseList(node) || !node.state || !node.state.walkable)\r\n                    return;\r\n                const opened = this._isOnOpenList(node);\r\n                /* on calcule le nouveau g */\r\n                const newG = currentNode.state.g + exports.NODE_DISTANCE_VALUE;\r\n                /*on calcule le nouveau h */\r\n                const newH = (Math.abs(endNode.state.row - node.state.row) + Math.abs(endNode.state.col - node.state.col)) * exports.NODE_DISTANCE_VALUE;\r\n                /*on calcule le nouveau F*/\r\n                const newF = newH + newG;\r\n                if ((opened && newG < node.state.g) || !opened) {\r\n                    //Si le node est déjà dans la liste ouverte, recalculez son G, s'il est inférieur à l'ancien, \r\n                    //faites de CURRENT  son parent(P) et recalculez et enregistrez ses propriétés F et H.\r\n                    //Si le node n'est pas dans la liste ouverte, ajoutez-le à la dite liste et faites de CURRENT son parent(P). \r\n                    //Calculez et enregistrez ses propriétés F, G et H.\r\n                    node.state.parent = currentNode;\r\n                    node.state.g = newG;\r\n                    node.state.h = newH;\r\n                    node.state.f = newF;\r\n                    if (!opened) {\r\n                        this._addToOpenList(node);\r\n                    }\r\n                }\r\n            });\r\n        }\r\n        // on finalise notre algo\r\n        const finalPath = [];\r\n        // on est sorti de la liste, on a deux solutions, soit la liste ouverte est vide dans ces cas là il \r\n        // n'y a pas de solutions et on retourne un finalPath vide\r\n        // soit il y a au moins un élément dans la liste ouverte et on peut reconstruire le chemin à rebours.\r\n        if (this.opened.length > 0) {\r\n            // Soit on construit le chemin à rebours;\r\n            let lastNode = endNode;\r\n            while (lastNode != startNode) {\r\n                finalPath.unshift(lastNode);\r\n                lastNode = lastNode.state.parent;\r\n            }\r\n            finalPath.unshift(startNode);\r\n        }\r\n        //on retourne nos résultats\r\n        return finalPath;\r\n    }\r\n    _addToCloseList(param_node) {\r\n        const index = this.opened.indexOf(param_node);\r\n        if (index > -1)\r\n            this.opened.splice(index, 1);\r\n        this.closed.push(param_node);\r\n    }\r\n    _addToOpenList(param_node) {\r\n        const index = this.closed.indexOf(param_node);\r\n        if (index > -1)\r\n            this.closed.splice(index, 1);\r\n        this.opened.push(param_node);\r\n    }\r\n    _isOnOpenList(param_node) {\r\n        return this.opened.indexOf(param_node) > -1;\r\n    }\r\n    _isOnCloseList(param_node) {\r\n        return this.closed.indexOf(param_node) > -1;\r\n    }\r\n}\r\nexports[\"default\"] = PathFinder2D;\r\nexports.NODE_DISTANCE_VALUE = 10;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/common/utils/PathFinder2D.js?");

/***/ }),

/***/ "./dist/common/utils/index.js":
/*!************************************!*\
  !*** ./dist/common/utils/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.PathFinder2D = exports.MazeNodeType = exports.Maze2D = void 0;\r\nconst Maze2D_1 = __webpack_require__(/*! ./Maze2D */ \"./dist/common/utils/Maze2D.js\");\r\nexports.Maze2D = Maze2D_1.default;\r\nconst MazeNodeType_1 = __webpack_require__(/*! ./MazeNodeType */ \"./dist/common/utils/MazeNodeType.js\");\r\nexports.MazeNodeType = MazeNodeType_1.default;\r\nconst PathFinder2D_1 = __webpack_require__(/*! ./PathFinder2D */ \"./dist/common/utils/PathFinder2D.js\");\r\nexports.PathFinder2D = PathFinder2D_1.default;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/common/utils/index.js?");

/***/ }),

/***/ "./dist/core/Engine.js":
/*!*****************************!*\
  !*** ./dist/core/Engine.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst tiny_observer_1 = __webpack_require__(/*! @thetinyspark/tiny-observer */ \"./node_modules/@thetinyspark/tiny-observer/dist/index.js\");\r\nconst app_const_1 = __webpack_require__(/*! ./ioc/app.const */ \"./dist/core/ioc/app.const.js\");\r\nconst config_1 = __webpack_require__(/*! ./ioc/config */ \"./dist/core/ioc/config.js\");\r\nconst version_1 = __webpack_require__(/*! ../version */ \"./dist/version.js\");\r\n/**\r\n * The Engine object represents the main gateway between you and the TowerIdle engine's core.\r\n */\r\nclass Engine extends tiny_observer_1.Emitter {\r\n    _facade;\r\n    _container;\r\n    constructor() {\r\n        super();\r\n    }\r\n    /**\r\n     * Reset data but keeps configuration\r\n     */\r\n    reset() {\r\n        const uidService = this._container.resolve(app_const_1.default.UID_SERVICE);\r\n        const battlefields = this._container.resolve(app_const_1.default.BATTLEFIELD_REPOSITORY);\r\n        uidService.reset();\r\n        battlefields.reset();\r\n    }\r\n    /**\r\n     * Init the engine, and restores game data\r\n     * @param container a Container's instance\r\n     * @param configuration game data to restore\r\n     */\r\n    init(container) {\r\n        container.reset();\r\n        config_1.configIOC(container);\r\n        config_1.configFacade(container);\r\n        this._facade = container.resolve(app_const_1.default.APP_FACADE);\r\n        this._container = container;\r\n        // reset\r\n        this.reset();\r\n    }\r\n    /**\r\n     * Returns a version num\r\n     * @returns string\r\n     */\r\n    getVersion() {\r\n        return version_1.version;\r\n    }\r\n    /**\r\n     * Returns the Facade which is used to dispatch commands and queries.\r\n     * @returns Facade\r\n     */\r\n    getFacade() {\r\n        return this._facade;\r\n    }\r\n    /**\r\n     * Creates a battlefield with proper configuration\r\n     * @param data BattleFieldDescType\r\n     * @returns Promise<boolean>\r\n     */\r\n    createBattleField(data) {\r\n        return this.getFacade().query(app_const_1.default.CREATE_BATTLEFIELD, data);\r\n    }\r\n    /**\r\n     * returns all battlefields\r\n     * @returns BattleField[]\r\n     */\r\n    getBattleFields() {\r\n        const repo = this.getFacade().getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);\r\n        return repo.getAll();\r\n    }\r\n    /**\r\n     * returns all battlefields\r\n     * @returns BattleField[]\r\n     */\r\n    getBattleFieldByID(id) {\r\n        const repo = this.getFacade().getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);\r\n        return repo.getOneBy('id', id);\r\n    }\r\n    /**\r\n     * Processes a cycle.\r\n     *\r\n     *\r\n     * example.ts\r\n     * ```typescript\r\n     * TowerIdle.engine.doCycle(1,1)\r\n     * ```\r\n     */\r\n    doCycle(battlefieldID, numCycle, untilGameOver = false) {\r\n        return this.getFacade().query(app_const_1.default.DO_CYCLE, { id: battlefieldID, numCycle, complete: untilGameOver });\r\n    }\r\n}\r\nexports[\"default\"] = Engine;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/Engine.js?");

/***/ }),

/***/ "./dist/core/command/CreateBattleFieldCommand.js":
/*!*******************************************************!*\
  !*** ./dist/core/command/CreateBattleFieldCommand.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst app_const_1 = __webpack_require__(/*! ../ioc/app.const */ \"./dist/core/ioc/app.const.js\");\r\n/**\r\n * Load battlefied configuration and creates a battlefield\r\n *\r\n * example.ts\r\n * ```typescript\r\n *\r\n *\r\n * ```\r\n */\r\nclass CreateBattleFieldCommand {\r\n    execute(notification) {\r\n        const facade = notification.getEmitter();\r\n        const data = notification.getPayload();\r\n        const factory = facade.getService(app_const_1.default.BATTLEFIELD_FACTORY);\r\n        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);\r\n        const bf = factory.fromData(data);\r\n        bfRepo.add(bf);\r\n        return bf;\r\n    }\r\n}\r\nexports[\"default\"] = CreateBattleFieldCommand;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/command/CreateBattleFieldCommand.js?");

/***/ }),

/***/ "./dist/core/command/DoCycleCommand.js":
/*!*********************************************!*\
  !*** ./dist/core/command/DoCycleCommand.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst app_const_1 = __webpack_require__(/*! ../ioc/app.const */ \"./dist/core/ioc/app.const.js\");\r\n/**\r\n * process an entire cycle\r\n *\r\n * example.ts\r\n * ```typescript\r\n *\r\n *\r\n * ```\r\n */\r\nclass DoCycleCommand {\r\n    async execute(notification) {\r\n        const facade = notification.getEmitter();\r\n        const data = notification.getPayload();\r\n        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);\r\n        const bf = bfRepo.getOneBy('id', data.id);\r\n        const complete = data.complete === true;\r\n        let info = null;\r\n        if (bf === null)\r\n            return false;\r\n        info = await this._processCycle(facade, bf, data.numCycle);\r\n        if (!complete || info.gameover)\r\n            return info;\r\n        let count = 0;\r\n        while (info.gameover == false && count < 10000) {\r\n            count++;\r\n            data.numCycle++;\r\n            info = await this._processCycle(facade, bf, data.numCycle);\r\n        }\r\n        return info;\r\n    }\r\n    async _processCycle(facade, bf, numCycle) {\r\n        await facade.query(app_const_1.default.SPAWN_NEW_FIGHTERS, { id: bf.id, numCycle: numCycle });\r\n        await facade.query(app_const_1.default.SEARCH_FOR_ENNEMIES, { id: bf.id });\r\n        await facade.query(app_const_1.default.SET_FIGHTERS_PATH, { id: bf.id });\r\n        await facade.query(app_const_1.default.MOVE_FIGHTERS, { id: bf.id });\r\n        await facade.query(app_const_1.default.FIGHT, { id: bf.id });\r\n        await facade.query(app_const_1.default.REMOVE_DEAD_FIGHTERS, { id: bf.id });\r\n        await facade.query(app_const_1.default.REMOVE_WINNERS, { id: bf.id });\r\n        return await facade.query(app_const_1.default.GAME_OVER, { id: bf.id });\r\n    }\r\n}\r\nexports[\"default\"] = DoCycleCommand;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/command/DoCycleCommand.js?");

/***/ }),

/***/ "./dist/core/command/FightCommand.js":
/*!*******************************************!*\
  !*** ./dist/core/command/FightCommand.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst app_const_1 = __webpack_require__(/*! ../ioc/app.const */ \"./dist/core/ioc/app.const.js\");\r\n/**\r\n * Proceed a fight attackers & defenders\r\n *\r\n * example.ts\r\n * ```typescript\r\n *\r\n *\r\n * ```\r\n */\r\nclass FightCommand {\r\n    execute(notification) {\r\n        const facade = notification.getEmitter();\r\n        const data = notification.getPayload();\r\n        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);\r\n        const bf = bfRepo.getOneBy('id', data.id);\r\n        if (bf === null)\r\n            return false;\r\n        const everyone = bf.attackers.concat(bf.defenders);\r\n        everyone.forEach((fighter) => {\r\n            if (!fighter.enemy)\r\n                return;\r\n            const phy = Math.max(0, fighter.phyAtk - fighter.enemy.phyDef);\r\n            const mag = Math.max(0, fighter.magAtk - fighter.enemy.magDef);\r\n            const total = mag + phy;\r\n            fighter.enemy.hp = Math.max(0, fighter.enemy.hp - total);\r\n        });\r\n        return true;\r\n    }\r\n}\r\nexports[\"default\"] = FightCommand;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/command/FightCommand.js?");

/***/ }),

/***/ "./dist/core/command/GameOverCommand.js":
/*!**********************************************!*\
  !*** ./dist/core/command/GameOverCommand.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst app_const_1 = __webpack_require__(/*! ../ioc/app.const */ \"./dist/core/ioc/app.const.js\");\r\n/**\r\n * Returns info about game over\r\n *\r\n * example.ts\r\n * ```typescript\r\n *\r\n *\r\n * ```\r\n */\r\nclass GameOverCommand {\r\n    execute(notification) {\r\n        const facade = notification.getEmitter();\r\n        const data = notification.getPayload();\r\n        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);\r\n        const winRepo = facade.getProxy(app_const_1.default.WINNERS_REPOSITORY);\r\n        const bf = bfRepo.getOneBy('id', data.id);\r\n        const info = {\r\n            attackers: [],\r\n            defenders: [],\r\n            winners: [],\r\n            attackerWins: false,\r\n            defenderWins: false,\r\n            gameover: false,\r\n            isDoorDead: false\r\n        };\r\n        if (bf === null)\r\n            return info;\r\n        info.attackers = bf.attackers;\r\n        info.defenders = bf.defenders;\r\n        info.winners = winRepo.getAll();\r\n        const numAttackersToSpawn = bf.atkSpawners.reduceRight((prev, cur, index) => {\r\n            return prev + cur.fighters.length;\r\n        }, 0);\r\n        const numAtkLeft = bf.attackers.length + numAttackersToSpawn;\r\n        const numWinners = info.winners.length;\r\n        const isDoorAlive = bf.defenders.includes(bf.door) && bf.door.hp > 0;\r\n        const isDoorDead = !isDoorAlive;\r\n        info.isDoorDead = isDoorDead;\r\n        if (numAtkLeft == 0) {\r\n            info.gameover = true;\r\n            info.defenderWins = numWinners == 0;\r\n            info.attackerWins = numWinners > 0;\r\n            return info;\r\n        }\r\n        return info;\r\n    }\r\n}\r\nexports[\"default\"] = GameOverCommand;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/command/GameOverCommand.js?");

/***/ }),

/***/ "./dist/core/command/MoveFightersCommand.js":
/*!**************************************************!*\
  !*** ./dist/core/command/MoveFightersCommand.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst app_const_1 = __webpack_require__(/*! ../ioc/app.const */ \"./dist/core/ioc/app.const.js\");\r\n/**\r\n * Move all fighters\r\n *\r\n * example.ts\r\n * ```typescript\r\n *\r\n *\r\n * ```\r\n */\r\nclass MoveFightersCommand {\r\n    execute(notification) {\r\n        const facade = notification.getEmitter();\r\n        const data = notification.getPayload();\r\n        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);\r\n        const bf = bfRepo.getOneBy('id', data.id);\r\n        if (bf === null)\r\n            return false;\r\n        bf.attackers.forEach((fighter) => {\r\n            if (fighter.path.length === 0 || fighter.enemy !== null)\r\n                return;\r\n            const nextIndx = Math.min(fighter.path.length - 1, fighter.speed);\r\n            fighter.row = fighter.path[nextIndx].state.row;\r\n            fighter.col = fighter.path[nextIndx].state.col;\r\n            fighter.path.splice(0, nextIndx);\r\n        });\r\n        bf.defenders.forEach((fighter) => {\r\n            if (fighter.path.length === 0 || fighter.enemy !== null)\r\n                return;\r\n            const nextIndx = Math.min(fighter.path.length - 1, fighter.speed);\r\n            fighter.row = fighter.path[nextIndx].state.row;\r\n            fighter.col = fighter.path[nextIndx].state.col;\r\n            fighter.path.splice(0, nextIndx);\r\n        });\r\n        return true;\r\n    }\r\n}\r\nexports[\"default\"] = MoveFightersCommand;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/command/MoveFightersCommand.js?");

/***/ }),

/***/ "./dist/core/command/RemoveDeadFightersCommand.js":
/*!********************************************************!*\
  !*** ./dist/core/command/RemoveDeadFightersCommand.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst app_const_1 = __webpack_require__(/*! ../ioc/app.const */ \"./dist/core/ioc/app.const.js\");\r\n/**\r\n * removes dead fighters from battlefield\r\n *\r\n * example.ts\r\n * ```typescript\r\n *\r\n *\r\n * ```\r\n */\r\nclass RemoveDeadFightersCommand {\r\n    execute(notification) {\r\n        const facade = notification.getEmitter();\r\n        const data = notification.getPayload();\r\n        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);\r\n        const bf = bfRepo.getOneBy('id', data.id);\r\n        if (bf === null)\r\n            return false;\r\n        bf.attackers.forEach((fighter) => {\r\n            if (fighter.hp <= 0)\r\n                bf.attackers.splice(bf.attackers.indexOf(fighter), 1);\r\n        });\r\n        bf.defenders.forEach((fighter) => {\r\n            if (fighter.hp <= 0)\r\n                bf.defenders.splice(bf.defenders.indexOf(fighter), 1);\r\n        });\r\n        return true;\r\n    }\r\n}\r\nexports[\"default\"] = RemoveDeadFightersCommand;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/command/RemoveDeadFightersCommand.js?");

/***/ }),

/***/ "./dist/core/command/RemoveWinnersCommand.js":
/*!***************************************************!*\
  !*** ./dist/core/command/RemoveWinnersCommand.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst app_const_1 = __webpack_require__(/*! ../ioc/app.const */ \"./dist/core/ioc/app.const.js\");\r\n/**\r\n * Remove all attackers that passes the door (aka winners)\r\n *\r\n * example.ts\r\n * ```typescript\r\n *\r\n *\r\n * ```\r\n */\r\nclass RemoveWinnersCommand {\r\n    execute(notification) {\r\n        const facade = notification.getEmitter();\r\n        const data = notification.getPayload();\r\n        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);\r\n        const winRepo = facade.getProxy(app_const_1.default.WINNERS_REPOSITORY);\r\n        const bf = bfRepo.getOneBy('id', data.id);\r\n        if (bf === null)\r\n            return false;\r\n        if (bf.door.hp > 0 || bf.defenders.includes(bf.door))\r\n            return true;\r\n        bf.attackers.forEach((fighter) => {\r\n            if (fighter.row === bf.targetRow && fighter.col === bf.targetCol) {\r\n                bf.attackers.splice(bf.attackers.indexOf(fighter), 1);\r\n                winRepo.add(fighter);\r\n            }\r\n        });\r\n        return true;\r\n    }\r\n}\r\nexports[\"default\"] = RemoveWinnersCommand;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/command/RemoveWinnersCommand.js?");

/***/ }),

/***/ "./dist/core/command/SearchForEnnemiesCommand.js":
/*!*******************************************************!*\
  !*** ./dist/core/command/SearchForEnnemiesCommand.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst app_const_1 = __webpack_require__(/*! ../ioc/app.const */ \"./dist/core/ioc/app.const.js\");\r\nconst Utils_1 = __webpack_require__(/*! ../utils/Utils */ \"./dist/core/utils/Utils.js\");\r\n/**\r\n * each fighter tries to find the closest ennemy inside its radius\r\n *\r\n * example.ts\r\n * ```typescript\r\n *\r\n *\r\n * ```\r\n */\r\nclass SearchForEnnemiesCommand {\r\n    execute(notification) {\r\n        const facade = notification.getEmitter();\r\n        const data = notification.getPayload();\r\n        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);\r\n        const bf = bfRepo.getOneBy('id', data.id);\r\n        if (bf === null)\r\n            return false;\r\n        bf.attackers.forEach((fighter) => {\r\n            const inside = Utils_1.default.getEnnemiesInRadius(bf.defenders, fighter.row, fighter.col, fighter.radius);\r\n            fighter.enemy = Utils_1.default.getClosestEnemyIn(inside, fighter.row, fighter.col);\r\n        });\r\n        bf.defenders.forEach((fighter) => {\r\n            const inside = Utils_1.default.getEnnemiesInRadius(bf.attackers, fighter.row, fighter.col, fighter.radius);\r\n            fighter.enemy = Utils_1.default.getClosestEnemyIn(inside, fighter.row, fighter.col);\r\n        });\r\n        return true;\r\n    }\r\n}\r\nexports[\"default\"] = SearchForEnnemiesCommand;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/command/SearchForEnnemiesCommand.js?");

/***/ }),

/***/ "./dist/core/command/SetFightersPathCommand.js":
/*!*****************************************************!*\
  !*** ./dist/core/command/SetFightersPathCommand.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst app_const_1 = __webpack_require__(/*! ../ioc/app.const */ \"./dist/core/ioc/app.const.js\");\r\nconst PathStrategyMode_1 = __webpack_require__(/*! ../model/enum/PathStrategyMode */ \"./dist/core/model/enum/PathStrategyMode.js\");\r\n/**\r\n * Set fighters paths\r\n *\r\n * example.ts\r\n * ```typescript\r\n *\r\n *\r\n * ```\r\n */\r\nclass SetFightersPathCommand {\r\n    execute(notification) {\r\n        const facade = notification.getEmitter();\r\n        const data = notification.getPayload();\r\n        const pathService = facade.getService(app_const_1.default.PATH_SERVICE);\r\n        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);\r\n        const bf = bfRepo.getOneBy('id', data.id);\r\n        if (bf === null)\r\n            return false;\r\n        bf.attackers.forEach((fighter) => {\r\n            fighter.path = pathService.findPath(fighter, bf, PathStrategyMode_1.default.TO_THE_DOOR);\r\n        });\r\n        bf.defenders.forEach((fighter) => {\r\n            if (fighter === bf.door)\r\n                return;\r\n            fighter.path = pathService.findPath(fighter, bf, PathStrategyMode_1.default.TO_THE_CLOSEST_ENEMY);\r\n        });\r\n        return true;\r\n    }\r\n}\r\nexports[\"default\"] = SetFightersPathCommand;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/command/SetFightersPathCommand.js?");

/***/ }),

/***/ "./dist/core/command/SpawnNewFightersCommand.js":
/*!******************************************************!*\
  !*** ./dist/core/command/SpawnNewFightersCommand.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst app_const_1 = __webpack_require__(/*! ../ioc/app.const */ \"./dist/core/ioc/app.const.js\");\r\n/**\r\n * Creates new fighters according to spawners configuration\r\n *\r\n * example.ts\r\n * ```typescript\r\n *\r\n *\r\n * ```\r\n */\r\nclass SpawnNewFightersCommand {\r\n    execute(notification) {\r\n        const facade = notification.getEmitter();\r\n        const data = notification.getPayload();\r\n        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);\r\n        const bf = bfRepo.getOneBy('id', data.id);\r\n        if (bf === null)\r\n            return false;\r\n        bf.atkSpawners.forEach((spawner) => {\r\n            const condition1 = data.numCycle % spawner.frequency !== 0;\r\n            const condition2 = spawner.fighters.length === 0;\r\n            if (condition1 || condition2)\r\n                return;\r\n            bf.attackers.push(spawner.fighters.shift());\r\n        });\r\n        bf.dfdSpawners.forEach((spawner) => {\r\n            const condition1 = data.numCycle % spawner.frequency !== 0;\r\n            const condition2 = spawner.fighters.length === 0;\r\n            if (condition1 || condition2)\r\n                return;\r\n            bf.defenders.push(spawner.fighters.shift());\r\n        });\r\n        return true;\r\n    }\r\n}\r\nexports[\"default\"] = SpawnNewFightersCommand;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/command/SpawnNewFightersCommand.js?");

/***/ }),

/***/ "./dist/core/command/index.js":
/*!************************************!*\
  !*** ./dist/core/command/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.DoCycleCommand = exports.GameOverCommand = exports.FightCommand = exports.RemoveWinnersCommand = exports.RemoveDeadFightersCommand = exports.MoveFightersCommand = exports.SetFightersPathCommand = exports.SearchForEnnemiesCommand = exports.SpawnNewFightersCommand = exports.CreateBattleFieldCommand = void 0;\r\nconst CreateBattleFieldCommand_1 = __webpack_require__(/*! ./CreateBattleFieldCommand */ \"./dist/core/command/CreateBattleFieldCommand.js\");\r\nexports.CreateBattleFieldCommand = CreateBattleFieldCommand_1.default;\r\nconst SpawnNewFightersCommand_1 = __webpack_require__(/*! ./SpawnNewFightersCommand */ \"./dist/core/command/SpawnNewFightersCommand.js\");\r\nexports.SpawnNewFightersCommand = SpawnNewFightersCommand_1.default;\r\nconst SearchForEnnemiesCommand_1 = __webpack_require__(/*! ./SearchForEnnemiesCommand */ \"./dist/core/command/SearchForEnnemiesCommand.js\");\r\nexports.SearchForEnnemiesCommand = SearchForEnnemiesCommand_1.default;\r\nconst SetFightersPathCommand_1 = __webpack_require__(/*! ./SetFightersPathCommand */ \"./dist/core/command/SetFightersPathCommand.js\");\r\nexports.SetFightersPathCommand = SetFightersPathCommand_1.default;\r\nconst MoveFightersCommand_1 = __webpack_require__(/*! ./MoveFightersCommand */ \"./dist/core/command/MoveFightersCommand.js\");\r\nexports.MoveFightersCommand = MoveFightersCommand_1.default;\r\nconst FightCommand_1 = __webpack_require__(/*! ./FightCommand */ \"./dist/core/command/FightCommand.js\");\r\nexports.FightCommand = FightCommand_1.default;\r\nconst RemoveDeadFightersCommand_1 = __webpack_require__(/*! ./RemoveDeadFightersCommand */ \"./dist/core/command/RemoveDeadFightersCommand.js\");\r\nexports.RemoveDeadFightersCommand = RemoveDeadFightersCommand_1.default;\r\nconst RemoveWinnersCommand_1 = __webpack_require__(/*! ./RemoveWinnersCommand */ \"./dist/core/command/RemoveWinnersCommand.js\");\r\nexports.RemoveWinnersCommand = RemoveWinnersCommand_1.default;\r\nconst GameOverCommand_1 = __webpack_require__(/*! ./GameOverCommand */ \"./dist/core/command/GameOverCommand.js\");\r\nexports.GameOverCommand = GameOverCommand_1.default;\r\nconst DoCycleCommand_1 = __webpack_require__(/*! ./DoCycleCommand */ \"./dist/core/command/DoCycleCommand.js\");\r\nexports.DoCycleCommand = DoCycleCommand_1.default;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/command/index.js?");

/***/ }),

/***/ "./dist/core/ioc/app.const.js":
/*!************************************!*\
  !*** ./dist/core/ioc/app.const.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass AppConst {\r\n    // facade\r\n    static APP_FACADE = \"AppFacade\";\r\n    // model\r\n    static GAME_STORE_MODEL = \"GameStoreModel\";\r\n    // commands\r\n    static FIGHT = \"Fight\";\r\n    static GAME_OVER = \"GameOver\";\r\n    static REMOVE_WINNERS = \"RemoveWinners\";\r\n    static MOVE_FIGHTERS = \"MoveFighters\";\r\n    static REMOVE_DEAD_FIGHTERS = \"RemoveDeadFighters\";\r\n    static SET_FIGHTERS_PATH = \"SetFightersPath\";\r\n    static CREATE_BATTLEFIELD = \"CreateBattleField\";\r\n    static SPAWN_NEW_FIGHTERS = \"SpawnNewFighters\";\r\n    static SEARCH_FOR_ENNEMIES = \"SearchForEnnemies\";\r\n    static DO_CYCLE = \"DoCycle\";\r\n    // repositories\r\n    static WINNERS_REPOSITORY = \"WinnersRepository\";\r\n    static BATTLEFIELD_REPOSITORY = \"BattleFieldRepository\";\r\n    // factories\r\n    static FIGHTER_FACTORY = \"FighterFactory\";\r\n    static SPAWNER_FACTORY = \"SpawnerFactory\";\r\n    static BATTLEFIELD_FACTORY = \"BattleFieldFactory\";\r\n    // services\r\n    static PATH_SERVICE = \"PathService\";\r\n    static UID_SERVICE = \"UIDService\";\r\n    static SERIALIZER_SERVICE = \"SerializerService\";\r\n}\r\nexports[\"default\"] = AppConst;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/ioc/app.const.js?");

/***/ }),

/***/ "./dist/core/ioc/config.js":
/*!*********************************!*\
  !*** ./dist/core/ioc/config.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.configFacade = exports.configIOC = void 0;\r\nconst coffe_maker_1 = __webpack_require__(/*! @thetinyspark/coffe-maker */ \"./node_modules/@thetinyspark/coffe-maker/dist/index.js\");\r\nconst app_const_1 = __webpack_require__(/*! ./app.const */ \"./dist/core/ioc/app.const.js\");\r\nconst UIDService_1 = __webpack_require__(/*! ../service/UIDService */ \"./dist/core/service/UIDService.js\");\r\nconst FighterFactory_1 = __webpack_require__(/*! ../service/factory/FighterFactory */ \"./dist/core/service/factory/FighterFactory.js\");\r\nconst SpawnerFactory_1 = __webpack_require__(/*! ../service/factory/SpawnerFactory */ \"./dist/core/service/factory/SpawnerFactory.js\");\r\nconst BattleFieldRepository_1 = __webpack_require__(/*! ../model/repository/BattleFieldRepository */ \"./dist/core/model/repository/BattleFieldRepository.js\");\r\nconst BattleFieldFactory_1 = __webpack_require__(/*! ../service/factory/BattleFieldFactory */ \"./dist/core/service/factory/BattleFieldFactory.js\");\r\nconst PathService_1 = __webpack_require__(/*! ../service/PathService */ \"./dist/core/service/PathService.js\");\r\nconst command_1 = __webpack_require__(/*! ../command */ \"./dist/core/command/index.js\");\r\nfunction configIOC(container) {\r\n    container.reset();\r\n    container.register(app_const_1.default.APP_FACADE, () => new coffe_maker_1.Facade(), true);\r\n    //commands\r\n    container.register(app_const_1.default.DO_CYCLE, () => new command_1.DoCycleCommand(), false);\r\n    container.register(app_const_1.default.GAME_OVER, () => new command_1.GameOverCommand(), false);\r\n    container.register(app_const_1.default.FIGHT, () => new command_1.FightCommand(), false);\r\n    container.register(app_const_1.default.REMOVE_WINNERS, () => new command_1.RemoveWinnersCommand(), false);\r\n    container.register(app_const_1.default.REMOVE_DEAD_FIGHTERS, () => new command_1.RemoveDeadFightersCommand(), false);\r\n    container.register(app_const_1.default.MOVE_FIGHTERS, () => new command_1.MoveFightersCommand(), false);\r\n    container.register(app_const_1.default.SET_FIGHTERS_PATH, () => new command_1.SetFightersPathCommand(), false);\r\n    container.register(app_const_1.default.CREATE_BATTLEFIELD, () => new command_1.CreateBattleFieldCommand(), false);\r\n    container.register(app_const_1.default.SPAWN_NEW_FIGHTERS, () => new command_1.SpawnNewFightersCommand(), false);\r\n    container.register(app_const_1.default.SEARCH_FOR_ENNEMIES, () => new command_1.SearchForEnnemiesCommand(), false);\r\n    // models\r\n    container.register(app_const_1.default.GAME_STORE_MODEL, () => new coffe_maker_1.StoreModel(), true);\r\n    // repositories\r\n    container.register(app_const_1.default.BATTLEFIELD_REPOSITORY, () => new BattleFieldRepository_1.default(container.resolve(app_const_1.default.GAME_STORE_MODEL), \"battlefields\"), true);\r\n    container.register(app_const_1.default.WINNERS_REPOSITORY, () => new BattleFieldRepository_1.default(container.resolve(app_const_1.default.GAME_STORE_MODEL), \"winners\"), true);\r\n    // services\r\n    container.register(app_const_1.default.FIGHTER_FACTORY, () => new FighterFactory_1.default(container.resolve(app_const_1.default.UID_SERVICE)), true);\r\n    container.register(app_const_1.default.UID_SERVICE, () => new UIDService_1.default(), true);\r\n    container.register(app_const_1.default.PATH_SERVICE, () => new PathService_1.default(), true);\r\n    // complex services\r\n    container.register(app_const_1.default.SPAWNER_FACTORY, () => new SpawnerFactory_1.default(container.resolve(app_const_1.default.UID_SERVICE), container.resolve(app_const_1.default.FIGHTER_FACTORY)), true);\r\n    container.register(app_const_1.default.BATTLEFIELD_FACTORY, () => new BattleFieldFactory_1.default(container.resolve(app_const_1.default.UID_SERVICE), container.resolve(app_const_1.default.SPAWNER_FACTORY), container.resolve(app_const_1.default.FIGHTER_FACTORY)), true);\r\n    return container;\r\n}\r\nexports.configIOC = configIOC;\r\nfunction configFacade(container) {\r\n    const facade = container.resolve(app_const_1.default.APP_FACADE);\r\n    // commands\r\n    facade.registerCommand(app_const_1.default.DO_CYCLE, container.get(app_const_1.default.DO_CYCLE));\r\n    facade.registerCommand(app_const_1.default.GAME_OVER, container.get(app_const_1.default.GAME_OVER));\r\n    facade.registerCommand(app_const_1.default.FIGHT, container.get(app_const_1.default.FIGHT));\r\n    facade.registerCommand(app_const_1.default.REMOVE_DEAD_FIGHTERS, container.get(app_const_1.default.REMOVE_DEAD_FIGHTERS));\r\n    facade.registerCommand(app_const_1.default.MOVE_FIGHTERS, container.get(app_const_1.default.MOVE_FIGHTERS));\r\n    facade.registerCommand(app_const_1.default.SET_FIGHTERS_PATH, container.get(app_const_1.default.SET_FIGHTERS_PATH));\r\n    facade.registerCommand(app_const_1.default.CREATE_BATTLEFIELD, container.get(app_const_1.default.CREATE_BATTLEFIELD));\r\n    facade.registerCommand(app_const_1.default.SPAWN_NEW_FIGHTERS, container.get(app_const_1.default.SPAWN_NEW_FIGHTERS));\r\n    facade.registerCommand(app_const_1.default.SEARCH_FOR_ENNEMIES, container.get(app_const_1.default.SEARCH_FOR_ENNEMIES));\r\n    facade.registerCommand(app_const_1.default.REMOVE_WINNERS, container.get(app_const_1.default.REMOVE_WINNERS));\r\n    //repositories\r\n    facade.registerProxy(app_const_1.default.BATTLEFIELD_REPOSITORY, container.resolve(app_const_1.default.BATTLEFIELD_REPOSITORY));\r\n    facade.registerProxy(app_const_1.default.WINNERS_REPOSITORY, container.resolve(app_const_1.default.WINNERS_REPOSITORY));\r\n    // services\r\n    facade.registerService(app_const_1.default.PATH_SERVICE, container.resolve(app_const_1.default.PATH_SERVICE));\r\n    facade.registerService(app_const_1.default.UID_SERVICE, container.resolve(app_const_1.default.UID_SERVICE));\r\n    facade.registerService(app_const_1.default.SERIALIZER_SERVICE, container.resolve(app_const_1.default.SERIALIZER_SERVICE));\r\n    facade.registerService(app_const_1.default.FIGHTER_FACTORY, container.resolve(app_const_1.default.FIGHTER_FACTORY));\r\n    facade.registerService(app_const_1.default.SPAWNER_FACTORY, container.resolve(app_const_1.default.SPAWNER_FACTORY));\r\n    facade.registerService(app_const_1.default.BATTLEFIELD_FACTORY, container.resolve(app_const_1.default.BATTLEFIELD_FACTORY));\r\n    return facade;\r\n}\r\nexports.configFacade = configFacade;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/ioc/config.js?");

/***/ }),

/***/ "./dist/core/model/enum/PathStrategyMode.js":
/*!**************************************************!*\
  !*** ./dist/core/model/enum/PathStrategyMode.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar PathStrategyMode;\r\n(function (PathStrategyMode) {\r\n    PathStrategyMode[\"TO_THE_DOOR\"] = \"TO_THE_DOOR\";\r\n    PathStrategyMode[\"TO_THE_CLOSEST_ENEMY\"] = \"TO_THE_CLOSEST_ENEMY\";\r\n})(PathStrategyMode || (PathStrategyMode = {}));\r\nexports[\"default\"] = PathStrategyMode;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/model/enum/PathStrategyMode.js?");

/***/ }),

/***/ "./dist/core/model/repository/BattleFieldRepository.js":
/*!*************************************************************!*\
  !*** ./dist/core/model/repository/BattleFieldRepository.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Repository_1 = __webpack_require__(/*! ./Repository */ \"./dist/core/model/repository/Repository.js\");\r\nclass BattleFieldRepository extends Repository_1.default {\r\n}\r\nexports[\"default\"] = BattleFieldRepository;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/model/repository/BattleFieldRepository.js?");

/***/ }),

/***/ "./dist/core/model/repository/Repository.js":
/*!**************************************************!*\
  !*** ./dist/core/model/repository/Repository.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst coffe_maker_1 = __webpack_require__(/*! @thetinyspark/coffe-maker */ \"./node_modules/@thetinyspark/coffe-maker/dist/index.js\");\r\nclass Repository extends coffe_maker_1.Proxy {\r\n    _state;\r\n    _key;\r\n    constructor(_state, _key) {\r\n        super();\r\n        this._state = _state;\r\n        this._key = _key;\r\n        this.reset();\r\n    }\r\n    reset() {\r\n        const save = {};\r\n        save[this._key] = new Array();\r\n        this._state.setState(save);\r\n    }\r\n    add(obj) {\r\n        const data = this.getAll();\r\n        data.push(obj);\r\n        const save = {};\r\n        save[this._key] = data;\r\n        this._state.setState(save);\r\n    }\r\n    remove(obj) {\r\n        const data = this.getAll();\r\n        data.splice(data.indexOf(obj), 1);\r\n        const save = {};\r\n        save[this._key] = data;\r\n        this._state.setState(save);\r\n    }\r\n    getAllBy(critera, value) {\r\n        return this.getAll().filter((current) => {\r\n            return current[critera] === value;\r\n        });\r\n    }\r\n    getOneBy(critera, value) {\r\n        return this.getAll().find((current) => {\r\n            return current[critera] === value;\r\n        }) || null;\r\n    }\r\n    getAll() {\r\n        return this._state.getState()[this._key];\r\n    }\r\n}\r\nexports[\"default\"] = Repository;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/model/repository/Repository.js?");

/***/ }),

/***/ "./dist/core/model/schema/BattleField.js":
/*!***********************************************!*\
  !*** ./dist/core/model/schema/BattleField.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass default_1 {\r\n    id;\r\n    name;\r\n    attackerID;\r\n    defenderID;\r\n    atkSpawners;\r\n    dfdSpawners;\r\n    door;\r\n    targetRow;\r\n    targetCol;\r\n    grid;\r\n    attackers;\r\n    defenders;\r\n    constructor(id, name, attackerID, defenderID, atkSpawners, dfdSpawners, door, targetRow, targetCol, grid, attackers = [], defenders = []) {\r\n        this.id = id;\r\n        this.name = name;\r\n        this.attackerID = attackerID;\r\n        this.defenderID = defenderID;\r\n        this.atkSpawners = atkSpawners;\r\n        this.dfdSpawners = dfdSpawners;\r\n        this.door = door;\r\n        this.targetRow = targetRow;\r\n        this.targetCol = targetCol;\r\n        this.grid = grid;\r\n        this.attackers = attackers;\r\n        this.defenders = defenders;\r\n    }\r\n}\r\nexports[\"default\"] = default_1;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/model/schema/BattleField.js?");

/***/ }),

/***/ "./dist/core/model/schema/Fighter.js":
/*!*******************************************!*\
  !*** ./dist/core/model/schema/Fighter.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Fighter {\r\n    id;\r\n    tplID;\r\n    name;\r\n    speed;\r\n    radius;\r\n    phyAtk;\r\n    phyDef;\r\n    magAtk;\r\n    magDef;\r\n    hp;\r\n    row;\r\n    col;\r\n    enemy;\r\n    path;\r\n    constructor(id, tplID, name, speed, radius, phyAtk, phyDef, magAtk, magDef, hp, row = 0, col = 0, enemy = null, path = []) {\r\n        this.id = id;\r\n        this.tplID = tplID;\r\n        this.name = name;\r\n        this.speed = speed;\r\n        this.radius = radius;\r\n        this.phyAtk = phyAtk;\r\n        this.phyDef = phyDef;\r\n        this.magAtk = magAtk;\r\n        this.magDef = magDef;\r\n        this.hp = hp;\r\n        this.row = row;\r\n        this.col = col;\r\n        this.enemy = enemy;\r\n        this.path = path;\r\n    }\r\n}\r\nexports[\"default\"] = Fighter;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/model/schema/Fighter.js?");

/***/ }),

/***/ "./dist/core/model/schema/Spawner.js":
/*!*******************************************!*\
  !*** ./dist/core/model/schema/Spawner.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Spawner {\r\n    id;\r\n    name;\r\n    ownerID;\r\n    row;\r\n    col;\r\n    frequency;\r\n    fighters;\r\n    constructor(id, name, ownerID, row, col, frequency, fighters) {\r\n        this.id = id;\r\n        this.name = name;\r\n        this.ownerID = ownerID;\r\n        this.row = row;\r\n        this.col = col;\r\n        this.frequency = frequency;\r\n        this.fighters = fighters;\r\n    }\r\n}\r\nexports[\"default\"] = Spawner;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/model/schema/Spawner.js?");

/***/ }),

/***/ "./dist/core/service/PathService.js":
/*!******************************************!*\
  !*** ./dist/core/service/PathService.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst utils_1 = __webpack_require__(/*! ../../common/utils */ \"./dist/common/utils/index.js\");\r\nconst PathStrategyMode_1 = __webpack_require__(/*! ../model/enum/PathStrategyMode */ \"./dist/core/model/enum/PathStrategyMode.js\");\r\nconst Utils_1 = __webpack_require__(/*! ../utils/Utils */ \"./dist/core/utils/Utils.js\");\r\nclass PathService {\r\n    _pathfinder;\r\n    constructor() {\r\n        this._pathfinder = new utils_1.PathFinder2D();\r\n    }\r\n    findPath(fighter, battlefield, strategy) {\r\n        const start = battlefield.grid.getAt(fighter.row, fighter.col);\r\n        const door = battlefield.grid.getAt(battlefield.door.row, battlefield.door.col);\r\n        let end = door;\r\n        if (strategy === PathStrategyMode_1.default.TO_THE_CLOSEST_ENEMY) {\r\n            const enemies = battlefield.attackers.includes(fighter) ? battlefield.defenders : battlefield.attackers;\r\n            const closest = Utils_1.default.getClosestEnemyIn(enemies, fighter.row, fighter.col);\r\n            if (closest == null)\r\n                return [];\r\n            const enemy = battlefield.grid.getAt(closest.row, closest.col);\r\n            end = enemy;\r\n        }\r\n        this._pathfinder.resetGraphe(battlefield.grid);\r\n        const path = this._pathfinder.findPath(battlefield.grid, start, end, false);\r\n        if (path.length == 0)\r\n            return path;\r\n        if (path[0].state.row == fighter.row && path[0].state.col == fighter.col)\r\n            path.shift();\r\n        return path;\r\n    }\r\n}\r\nexports[\"default\"] = PathService;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/service/PathService.js?");

/***/ }),

/***/ "./dist/core/service/UIDService.js":
/*!*****************************************!*\
  !*** ./dist/core/service/UIDService.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass UIDService {\r\n    ids = new Map();\r\n    reset() {\r\n        this.ids = new Map();\r\n    }\r\n    createUID(category = \"no_category\", defaultUID = -1) {\r\n        if (!this.ids.has(category))\r\n            this.ids.set(category, []);\r\n        const ids = this.ids.get(category);\r\n        const maxID = Math.max(...ids, 0);\r\n        const id = defaultUID > maxID + 1 ? defaultUID : maxID + 1;\r\n        ids.push(id);\r\n        return id;\r\n    }\r\n}\r\nexports[\"default\"] = UIDService;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/service/UIDService.js?");

/***/ }),

/***/ "./dist/core/service/factory/BattleFieldFactory.js":
/*!*********************************************************!*\
  !*** ./dist/core/service/factory/BattleFieldFactory.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst grid_1 = __webpack_require__(/*! ../../../common/model/space/partitioning/grid */ \"./dist/common/model/space/partitioning/grid/index.js\");\r\nconst utils_1 = __webpack_require__(/*! ../../../common/utils */ \"./dist/common/utils/index.js\");\r\nconst BattleField_1 = __webpack_require__(/*! ../../model/schema/BattleField */ \"./dist/core/model/schema/BattleField.js\");\r\nclass BattleFieldFactory {\r\n    _uidService;\r\n    _spawnerFactory;\r\n    _fighterFactory;\r\n    constructor(_uidService, _spawnerFactory, _fighterFactory) {\r\n        this._uidService = _uidService;\r\n        this._spawnerFactory = _spawnerFactory;\r\n        this._fighterFactory = _fighterFactory;\r\n        this.fromData = this.fromData.bind(this);\r\n    }\r\n    fromData(desc) {\r\n        const id = this._uidService.createUID(\"battlefields\", desc.id);\r\n        const spawnersAtk = desc.atkSpawners.map(this._spawnerFactory.fromData);\r\n        const spawnersDfd = desc.dfdSpawners.map(this._spawnerFactory.fromData);\r\n        const door = this._fighterFactory.fromData(desc.door);\r\n        const pathfinder = new utils_1.PathFinder2D();\r\n        const grid = pathfinder.createGraphe(grid_1.Grid2D.from(desc.grid), 0);\r\n        door.row = desc.targetRow;\r\n        door.col = desc.targetCol;\r\n        const bf = new BattleField_1.default(id, desc.name, desc.attackerID, desc.defenderID, spawnersAtk, spawnersDfd, door, desc.targetRow, desc.targetCol, grid, [], [door]);\r\n        return bf;\r\n    }\r\n}\r\nexports[\"default\"] = BattleFieldFactory;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/service/factory/BattleFieldFactory.js?");

/***/ }),

/***/ "./dist/core/service/factory/FighterFactory.js":
/*!*****************************************************!*\
  !*** ./dist/core/service/factory/FighterFactory.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Fighter_1 = __webpack_require__(/*! ../../model/schema/Fighter */ \"./dist/core/model/schema/Fighter.js\");\r\nclass FighterFactory {\r\n    _uidService;\r\n    constructor(_uidService) {\r\n        this._uidService = _uidService;\r\n        this.fromData = this.fromData.bind(this);\r\n    }\r\n    fromData(desc) {\r\n        const id = this._uidService.createUID(\"fighters\", desc.id);\r\n        return new Fighter_1.default(id, desc.tplID, desc.name, desc.speed, desc.radius, desc.phyAtk, desc.phyDef, desc.magAtk, desc.magDef, desc.hp);\r\n    }\r\n}\r\nexports[\"default\"] = FighterFactory;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/service/factory/FighterFactory.js?");

/***/ }),

/***/ "./dist/core/service/factory/SpawnerFactory.js":
/*!*****************************************************!*\
  !*** ./dist/core/service/factory/SpawnerFactory.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Spawner_1 = __webpack_require__(/*! ../../model/schema/Spawner */ \"./dist/core/model/schema/Spawner.js\");\r\nclass SpawnerFactory {\r\n    _uidService;\r\n    _fighterFactory;\r\n    constructor(_uidService, _fighterFactory) {\r\n        this._uidService = _uidService;\r\n        this._fighterFactory = _fighterFactory;\r\n        this.fromData = this.fromData.bind(this);\r\n    }\r\n    fromData(desc) {\r\n        const id = this._uidService.createUID(\"spawners\", desc.id);\r\n        const fighters = desc.fighters.flatMap((poolDesc) => {\r\n            const results = [];\r\n            for (let i = 0; i < poolDesc.amount; i++) {\r\n                const fighter = this._fighterFactory.fromData(poolDesc.desc);\r\n                fighter.active = false;\r\n                fighter.row = desc.row;\r\n                fighter.col = desc.col;\r\n                results.push(fighter);\r\n            }\r\n            return results;\r\n        });\r\n        const spawner = new Spawner_1.default(id, desc.name, desc.ownerID, desc.row, desc.col, desc.frequency, fighters);\r\n        return spawner;\r\n    }\r\n}\r\nexports[\"default\"] = SpawnerFactory;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/service/factory/SpawnerFactory.js?");

/***/ }),

/***/ "./dist/core/utils/Utils.js":
/*!**********************************!*\
  !*** ./dist/core/utils/Utils.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Utils {\r\n    static getInRadius(grid, fromRow, fromCol, radius) {\r\n        const results = [];\r\n        const minRow = (fromRow - radius) < 0 ? 0 : (fromRow - radius);\r\n        const minCol = (fromCol - radius) < 0 ? 0 : (fromCol - radius);\r\n        const maxRow = (fromRow + radius + 1) > grid.numRows ? grid.numRows : (fromRow + radius + 1);\r\n        const maxCol = (fromCol + radius + 1) > grid.numCols ? grid.numCols : (fromCol + radius + 1);\r\n        for (let i = minRow; i < maxRow; i++) {\r\n            for (let j = minCol; j < maxCol; j++) {\r\n                if (i === fromRow && j === fromCol)\r\n                    continue;\r\n                results.push(grid.getAt(i, j));\r\n            }\r\n        }\r\n        return results;\r\n    }\r\n    static getEnnemiesInRadius(ennemies, fromRow, fromCol, radius) {\r\n        const minRow = (fromRow - radius);\r\n        const minCol = (fromCol - radius);\r\n        const maxRow = (fromRow + radius);\r\n        const maxCol = (fromCol + radius);\r\n        return ennemies.filter((enemy) => {\r\n            return (enemy.col >= minCol &&\r\n                enemy.col <= maxCol &&\r\n                enemy.row >= minRow &&\r\n                enemy.row <= maxRow);\r\n        });\r\n    }\r\n    static getClosestEnemyIn(ennemies, fromRow, fromCol) {\r\n        let minDist = Infinity;\r\n        let enemy = null;\r\n        for (let i = 0; i < ennemies.length; i++) {\r\n            const distRow = ennemies[i].row - fromRow;\r\n            const distCol = ennemies[i].col - fromCol;\r\n            const dist = Math.sqrt((distRow * distRow) + (distCol * distCol));\r\n            if (dist < minDist) {\r\n                minDist = dist;\r\n                enemy = ennemies[i];\r\n            }\r\n        }\r\n        return enemy;\r\n    }\r\n}\r\nexports[\"default\"] = Utils;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/core/utils/Utils.js?");

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\nconst coffe_maker_1 = __webpack_require__(/*! @thetinyspark/coffe-maker */ \"./node_modules/@thetinyspark/coffe-maker/dist/index.js\");\r\nconst Engine_1 = __webpack_require__(/*! ./core/Engine */ \"./dist/core/Engine.js\");\r\nconst app_const_1 = __webpack_require__(/*! ./core/ioc/app.const */ \"./dist/core/ioc/app.const.js\");\r\nconst engine = new Engine_1.default();\r\nconst defaultContainer = new coffe_maker_1.Container();\r\nengine.init(defaultContainer);\r\nmodule.exports = {\r\n    enginetowerIdleEngine: engine,\r\n    consts: app_const_1.default\r\n};\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/index.js?");

/***/ }),

/***/ "./dist/version.js":
/*!*************************!*\
  !*** ./dist/version.js ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.version = void 0;\r\nexports.version = \"1.0.1\";\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./dist/version.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/coffe-maker/dist/core/Facade.js":
/*!********************************************************************!*\
  !*** ./node_modules/@thetinyspark/coffe-maker/dist/core/Facade.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst tiny_observer_1 = __webpack_require__(/*! @thetinyspark/tiny-observer */ \"./node_modules/@thetinyspark/tiny-observer/dist/index.js\");\r\nclass Facade extends tiny_observer_1.Emitter {\r\n    constructor() {\r\n        super(...arguments);\r\n        this._proxies = new Map();\r\n        this._mediators = new Map();\r\n        this._services = new Map();\r\n        this.sendNotification = (key, payload = {}) => {\r\n            this.emit(key, payload);\r\n        };\r\n        this.query = (key, payload = {}) => {\r\n            const promise = this.emit(key, payload, true);\r\n            return promise.then((results) => {\r\n                if (results.length === 1)\r\n                    return results.shift();\r\n                return results;\r\n            });\r\n        };\r\n    }\r\n    registerCommand(key, factoryMethod) {\r\n        this.subscribe(key, (notification) => {\r\n            return factoryMethod.call(null).execute(notification);\r\n        });\r\n    }\r\n    registerProxy(key, proxy) {\r\n        proxy.setFacade(this);\r\n        this._proxies.set(key, proxy);\r\n    }\r\n    registerMediator(key, mediator) {\r\n        mediator.setFacade(this);\r\n        this._mediators.set(key, mediator);\r\n    }\r\n    registerService(key, service) {\r\n        this._services.set(key, service);\r\n    }\r\n    getService(key) {\r\n        return this._services.get(key) || null;\r\n    }\r\n    getProxy(key) {\r\n        return this._proxies.get(key) || null;\r\n    }\r\n    getMediator(key) {\r\n        return this._mediators.get(key) || null;\r\n    }\r\n}\r\nexports[\"default\"] = Facade;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./node_modules/@thetinyspark/coffe-maker/dist/core/Facade.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/coffe-maker/dist/core/ioc/Container.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@thetinyspark/coffe-maker/dist/core/ioc/Container.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.rootContainer = void 0;\r\nclass Container {\r\n    constructor() {\r\n        this.reset();\r\n    }\r\n    resolve(key) {\r\n        if (!this._map.has(key))\r\n            return null;\r\n        if (this._singleton.has(key)) {\r\n            if (this._singleton.get(key) === null) {\r\n                this._singleton.set(key, this._map.get(key).call(null));\r\n            }\r\n            return this._singleton.get(key);\r\n        }\r\n        return this._map.get(key).call(null);\r\n    }\r\n    reset() {\r\n        this._map = new Map();\r\n        this._singleton = new Map();\r\n    }\r\n    register(key, factoryMethod, singleton = false) {\r\n        this._map.delete(key);\r\n        this._singleton.delete(key);\r\n        this._map.set(key, factoryMethod);\r\n        if (singleton)\r\n            this._singleton.set(key, null);\r\n    }\r\n    get(key) {\r\n        return this._map.get(key) || null;\r\n    }\r\n}\r\nexports[\"default\"] = Container;\r\nexports.rootContainer = new Container();\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./node_modules/@thetinyspark/coffe-maker/dist/core/ioc/Container.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/coffe-maker/dist/core/ioc/Injectable.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@thetinyspark/coffe-maker/dist/core/ioc/Injectable.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Container_1 = __webpack_require__(/*! ./Container */ \"./node_modules/@thetinyspark/coffe-maker/dist/core/ioc/Container.js\");\r\nfunction Injectable(props) {\r\n    const container = props.container || Container_1.rootContainer;\r\n    const singleton = props.singleton || false;\r\n    return function (target) {\r\n        container.register(props.token, () => new target(), singleton);\r\n    };\r\n}\r\nexports[\"default\"] = Injectable;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./node_modules/@thetinyspark/coffe-maker/dist/core/ioc/Injectable.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/coffe-maker/dist/core/ioc/resolve.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@thetinyspark/coffe-maker/dist/core/ioc/resolve.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Container_1 = __webpack_require__(/*! ./Container */ \"./node_modules/@thetinyspark/coffe-maker/dist/core/ioc/Container.js\");\r\nfunction resolve(token, container = null) {\r\n    if (container !== null)\r\n        return container.resolve(token);\r\n    else\r\n        return Container_1.rootContainer.resolve(token);\r\n}\r\nexports[\"default\"] = resolve;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./node_modules/@thetinyspark/coffe-maker/dist/core/ioc/resolve.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/coffe-maker/dist/core/model/Model.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@thetinyspark/coffe-maker/dist/core/model/Model.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Model {\r\n    constructor() {\r\n        this._state = null;\r\n    }\r\n    setState(value) {\r\n        this._state = value;\r\n    }\r\n    getState() {\r\n        return this._state;\r\n    }\r\n    resetState() {\r\n        this._state = null;\r\n    }\r\n}\r\nexports[\"default\"] = Model;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./node_modules/@thetinyspark/coffe-maker/dist/core/model/Model.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/coffe-maker/dist/core/model/Proxy.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@thetinyspark/coffe-maker/dist/core/model/Proxy.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Proxy {\r\n    constructor() {\r\n        this._facade = null;\r\n    }\r\n    setFacade(facade) {\r\n        this._facade = facade;\r\n    }\r\n    getFacade() {\r\n        return this._facade;\r\n    }\r\n}\r\nexports[\"default\"] = Proxy;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./node_modules/@thetinyspark/coffe-maker/dist/core/model/Proxy.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/coffe-maker/dist/core/model/StoreModel.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@thetinyspark/coffe-maker/dist/core/model/StoreModel.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Model_1 = __webpack_require__(/*! ./Model */ \"./node_modules/@thetinyspark/coffe-maker/dist/core/model/Model.js\");\r\nclass StoreModel extends Model_1.default {\r\n    constructor() {\r\n        super(...arguments);\r\n        this._old = null;\r\n    }\r\n    setState(value) {\r\n        const newState = { ...this._state, ...value };\r\n        this._old = this._state;\r\n        this._state = newState;\r\n        this.deepFreeze(this._state);\r\n    }\r\n    getState() {\r\n        return this._state;\r\n    }\r\n    getPrevState() {\r\n        return this._old;\r\n    }\r\n    resetState() {\r\n        this._state = null;\r\n        this._old = null;\r\n    }\r\n    updated() {\r\n        const notSame = this._state !== this._old;\r\n        this._state = this._old;\r\n        return notSame;\r\n    }\r\n    deepFreeze(obj) {\r\n        return Object.freeze(obj);\r\n    }\r\n}\r\nexports[\"default\"] = StoreModel;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./node_modules/@thetinyspark/coffe-maker/dist/core/model/StoreModel.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/coffe-maker/dist/core/module/CoffeeModule.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@thetinyspark/coffe-maker/dist/core/module/CoffeeModule.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass CoffeeModule {\r\n    constructor() {\r\n        this._config = null;\r\n    }\r\n    load(facade) {\r\n        if (this._config === null)\r\n            return;\r\n        this._config.proxies.forEach((value) => {\r\n            facade.registerProxy(value.key, value.instance);\r\n        });\r\n        this._config.mediators.forEach((value) => {\r\n            facade.registerMediator(value.key, value.instance);\r\n        });\r\n        this._config.services.forEach((value) => {\r\n            facade.registerService(value.key, value.instance);\r\n        });\r\n        this._config.commands.forEach((value) => {\r\n            facade.registerCommand(value.key, value.factory);\r\n        });\r\n    }\r\n    getConfiguration() {\r\n        return this._config;\r\n    }\r\n    configure(config) {\r\n        this._config = config;\r\n    }\r\n}\r\nexports[\"default\"] = CoffeeModule;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./node_modules/@thetinyspark/coffe-maker/dist/core/module/CoffeeModule.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/coffe-maker/dist/core/view/Mediator.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@thetinyspark/coffe-maker/dist/core/view/Mediator.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Mediator {\r\n    constructor() {\r\n        this._facade = null;\r\n    }\r\n    setFacade(facade) {\r\n        this._facade = facade;\r\n    }\r\n    getFacade() {\r\n        return this._facade;\r\n    }\r\n}\r\nexports[\"default\"] = Mediator;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./node_modules/@thetinyspark/coffe-maker/dist/core/view/Mediator.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/coffe-maker/dist/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@thetinyspark/coffe-maker/dist/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.resolve = exports.Injectable = exports.CoffeeModule = exports.Facade = exports.Mediator = exports.StoreModel = exports.Proxy = exports.Model = exports.Container = void 0;\r\nconst Container_1 = __webpack_require__(/*! ./core/ioc/Container */ \"./node_modules/@thetinyspark/coffe-maker/dist/core/ioc/Container.js\");\r\nexports.Container = Container_1.default;\r\nconst Injectable_1 = __webpack_require__(/*! ./core/ioc/Injectable */ \"./node_modules/@thetinyspark/coffe-maker/dist/core/ioc/Injectable.js\");\r\nexports.Injectable = Injectable_1.default;\r\nconst resolve_1 = __webpack_require__(/*! ./core/ioc/resolve */ \"./node_modules/@thetinyspark/coffe-maker/dist/core/ioc/resolve.js\");\r\nexports.resolve = resolve_1.default;\r\nconst Model_1 = __webpack_require__(/*! ./core/model/Model */ \"./node_modules/@thetinyspark/coffe-maker/dist/core/model/Model.js\");\r\nexports.Model = Model_1.default;\r\nconst Proxy_1 = __webpack_require__(/*! ./core/model/Proxy */ \"./node_modules/@thetinyspark/coffe-maker/dist/core/model/Proxy.js\");\r\nexports.Proxy = Proxy_1.default;\r\nconst StoreModel_1 = __webpack_require__(/*! ./core/model/StoreModel */ \"./node_modules/@thetinyspark/coffe-maker/dist/core/model/StoreModel.js\");\r\nexports.StoreModel = StoreModel_1.default;\r\nconst Mediator_1 = __webpack_require__(/*! ./core/view/Mediator */ \"./node_modules/@thetinyspark/coffe-maker/dist/core/view/Mediator.js\");\r\nexports.Mediator = Mediator_1.default;\r\nconst Facade_1 = __webpack_require__(/*! ./core/Facade */ \"./node_modules/@thetinyspark/coffe-maker/dist/core/Facade.js\");\r\nexports.Facade = Facade_1.default;\r\nconst CoffeeModule_1 = __webpack_require__(/*! ./core/module/CoffeeModule */ \"./node_modules/@thetinyspark/coffe-maker/dist/core/module/CoffeeModule.js\");\r\nexports.CoffeeModule = CoffeeModule_1.default;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./node_modules/@thetinyspark/coffe-maker/dist/index.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/tiny-observer/dist/event/Emitter.js":
/*!************************************************************************!*\
  !*** ./node_modules/@thetinyspark/tiny-observer/dist/event/Emitter.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Notification_1 = __webpack_require__(/*! ./Notification */ \"./node_modules/@thetinyspark/tiny-observer/dist/event/Notification.js\");\r\nvar Emitter = /** @class */ (function () {\r\n    function Emitter() {\r\n        this._observers = new Map();\r\n    }\r\n    Emitter.prototype.emit = function (eventType, payload, promised) {\r\n        var _this = this;\r\n        if (promised === void 0) { promised = false; }\r\n        var observers = this._observers.get(eventType) || [];\r\n        var notif = new Notification_1.default(eventType, this, payload);\r\n        var values = observers.map(function (observer) {\r\n            var result = null;\r\n            if (observer.limit > 0 || observer.infinite) {\r\n                observer.limit--;\r\n                result = observer.func(notif);\r\n            }\r\n            else {\r\n                _this.unsubscribe(eventType, observer.func);\r\n            }\r\n            if (promised)\r\n                return Promise.resolve(result);\r\n        });\r\n        return Promise.all(values);\r\n    };\r\n    Emitter.prototype.hasObservers = function (eventType) {\r\n        return this._observers.get(eventType) !== undefined;\r\n    };\r\n    Emitter.prototype.unsubscribe = function (eventType, observer) {\r\n        if (this.isObserver(eventType, observer)) {\r\n            var observers = this._observers.get(eventType) || [];\r\n            var index = observers.map(function (o) { return o.func; }).indexOf(observer);\r\n            observers.splice(index, 1);\r\n            if (observers.length === 0)\r\n                this._observers.set(eventType, undefined);\r\n        }\r\n    };\r\n    Emitter.prototype.isObserver = function (eventType, observer) {\r\n        var observers = this._observers.get(eventType) || [];\r\n        return observers.map(function (o) { return o.func; }).indexOf(observer) > -1;\r\n    };\r\n    Emitter.prototype.subscribe = function (eventType, observer, limit) {\r\n        if (limit === void 0) { limit = -1; }\r\n        if (this.isObserver(eventType, observer))\r\n            return false;\r\n        var observers = this._observers.get(eventType) || [];\r\n        observers.push({ func: observer, limit: limit, infinite: limit < 0 });\r\n        this._observers.set(eventType, observers);\r\n        return true;\r\n    };\r\n    Emitter.prototype.unsubscribeAll = function () {\r\n        this._observers = new Map();\r\n    };\r\n    return Emitter;\r\n}());\r\nexports[\"default\"] = Emitter;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./node_modules/@thetinyspark/tiny-observer/dist/event/Emitter.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/tiny-observer/dist/event/Notification.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@thetinyspark/tiny-observer/dist/event/Notification.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Notification = /** @class */ (function () {\r\n    function Notification(type, emitter, payload) {\r\n        this._type = type;\r\n        this._emitter = emitter;\r\n        this._payload = payload;\r\n    }\r\n    Notification.prototype.getEventType = function () {\r\n        return this._type;\r\n    };\r\n    Notification.prototype.getEmitter = function () {\r\n        return this._emitter;\r\n    };\r\n    Notification.prototype.getPayload = function () {\r\n        return this._payload;\r\n    };\r\n    return Notification;\r\n}());\r\nexports[\"default\"] = Notification;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./node_modules/@thetinyspark/tiny-observer/dist/event/Notification.js?");

/***/ }),

/***/ "./node_modules/@thetinyspark/tiny-observer/dist/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@thetinyspark/tiny-observer/dist/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Notification = exports.Emitter = void 0;\r\nvar Emitter_1 = __webpack_require__(/*! ./event/Emitter */ \"./node_modules/@thetinyspark/tiny-observer/dist/event/Emitter.js\");\r\nexports.Emitter = Emitter_1.default;\r\nvar Notification_1 = __webpack_require__(/*! ./event/Notification */ \"./node_modules/@thetinyspark/tiny-observer/dist/event/Notification.js\");\r\nexports.Notification = Notification_1.default;\r\n\n\n//# sourceURL=webpack://@thetinyspark/toweridle/./node_modules/@thetinyspark/tiny-observer/dist/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/index.js");
/******/ 	
/******/ })()
;
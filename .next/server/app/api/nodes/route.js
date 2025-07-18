/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/nodes/route";
exports.ids = ["app/api/nodes/route"];
exports.modules = {

/***/ "(rsc)/./app/api/nodes/route.tsx":
/*!*********************************!*\
  !*** ./app/api/nodes/route.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v4/classic/schemas.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v4/classic/coerce.js\");\n\n\n\nconst nodeSchema = zod__WEBPACK_IMPORTED_MODULE_2__.object({\n    name: zod__WEBPACK_IMPORTED_MODULE_2__.string().min(1, {\n        message: \"Name is required\"\n    }),\n    location: zod__WEBPACK_IMPORTED_MODULE_2__.string().min(1, {\n        message: \"Location is required\"\n    }),\n    fqdn: zod__WEBPACK_IMPORTED_MODULE_2__.string().min(1, {\n        message: \"FQDN is required\"\n    }),\n    os: zod__WEBPACK_IMPORTED_MODULE_2__[\"enum\"]([\n        \"debian\",\n        \"nixos\"\n    ]),\n    visibility: zod__WEBPACK_IMPORTED_MODULE_2__[\"enum\"]([\n        \"Public\",\n        \"Private\"\n    ]),\n    daemonPort: zod__WEBPACK_IMPORTED_MODULE_3__.number().int().positive(),\n    useSSL: zod__WEBPACK_IMPORTED_MODULE_2__.preprocess((val)=>val === 'on' || val === true, zod__WEBPACK_IMPORTED_MODULE_2__.boolean()),\n    memory: zod__WEBPACK_IMPORTED_MODULE_3__.number().int().positive(),\n    disk: zod__WEBPACK_IMPORTED_MODULE_3__.number().int().positive(),\n    portsStart: zod__WEBPACK_IMPORTED_MODULE_3__.number().int().positive(),\n    portsEnd: zod__WEBPACK_IMPORTED_MODULE_3__.number().int().positive()\n}).refine((data)=>data.portsEnd > data.portsStart, {\n    message: \"Port range end must be greater than start\",\n    path: [\n        \"portsEnd\"\n    ]\n});\n// GET /api/nodes - Fetch all nodes\nasync function GET() {\n    const nodes = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].node.findMany({\n        orderBy: {\n            createdAt: \"desc\"\n        }\n    });\n    // In a real app, you would also check the actual status of the daemon\n    const nodesWithStatus = nodes.map((n)=>({\n            ...n,\n            status: \"Online\",\n            servers: 0\n        }));\n    return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(nodesWithStatus);\n}\n// POST /api/nodes - Add a new node\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const validation = nodeSchema.safeParse(body);\n        if (!validation.success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: validation.error.flatten().fieldErrors\n            }, {\n                status: 400\n            });\n        }\n        const { name, location, fqdn, daemonPort, useSSL, memory, disk, portsStart, portsEnd, os, visibility } = validation.data;\n        const node = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].node.create({\n            data: {\n                name,\n                location,\n                fqdn,\n                daemonPort,\n                useSSL,\n                memory,\n                disk,\n                ports: {\n                    start: portsStart,\n                    end: portsEnd\n                },\n                os,\n                visibility,\n                uuid: crypto.randomUUID(),\n                token: crypto.randomUUID(),\n                tokenId: crypto.randomUUID().substring(0, 8)\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(node);\n    } catch (e) {\n        console.error(e);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFFBQVFkLEtBQUssQ0FBQ2E7UUFDZCxPQUFPNUQscURBQVlBLENBQUN3QyxJQUFJLENBQUM7WUFBRU8sT0FBTztRQUF3QixHQUFHO1lBQUVULFFBQVE7UUFBSTtJQUMvRTtBQUNGIiwic291cmNlcyI6WyIvaG9tZS91c2VyL3N0dWRpby9hcHAvYXBpL25vZGVzL3JvdXRlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBwcmlzbWEgZnJvbSBcIi4uLy4uLy4uL2xpYi9wcmlzbWFcIjtcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIjtcblxuY29uc3Qgbm9kZVNjaGVtYSA9IHoub2JqZWN0KHtcbiAgbmFtZTogei5zdHJpbmcoKS5taW4oMSwgeyBtZXNzYWdlOiBcIk5hbWUgaXMgcmVxdWlyZWRcIiB9KSxcbiAgbG9jYXRpb246IHouc3RyaW5nKCkubWluKDEsIHsgbWVzc2FnZTogXCJMb2NhdGlvbiBpcyByZXF1aXJlZFwiIH0pLFxuICBmcWRuOiB6LnN0cmluZygpLm1pbigxLCB7IG1lc3NhZ2U6IFwiRlFETiBpcyByZXF1aXJlZFwiIH0pLFxuICBvczogei5lbnVtKFtcImRlYmlhblwiLCBcIm5peG9zXCJdKSxcbiAgdmlzaWJpbGl0eTogei5lbnVtKFtcIlB1YmxpY1wiLCBcIlByaXZhdGVcIl0pLFxuICBkYWVtb25Qb3J0OiB6LmNvZXJjZS5udW1iZXIoKS5pbnQoKS5wb3NpdGl2ZSgpLFxuICB1c2VTU0w6IHoucHJlcHJvY2VzcygodmFsKSA9PiB2YWwgPT09ICdvbicgfHwgdmFsID09PSB0cnVlLCB6LmJvb2xlYW4oKSksXG4gIG1lbW9yeTogei5jb2VyY2UubnVtYmVyKCkuaW50KCkucG9zaXRpdmUoKSxcbiAgZGlzazogei5jb2VyY2UubnVtYmVyKCkuaW50KCkucG9zaXRpdmUoKSxcbiAgcG9ydHNTdGFydDogei5jb2VyY2UubnVtYmVyKCkuaW50KCkucG9zaXRpdmUoKSxcbiAgcG9ydHNFbmQ6IHouY29lcmNlLm51bWJlcigpLmludCgpLnBvc2l0aXZlKCksXG59KS5yZWZpbmUoZGF0YSA9PiBkYXRhLnBvcnRzRW5kID4gZGF0YS5wb3J0c1N0YXJ0LCB7XG4gICAgbWVzc2FnZTogXCJQb3J0IHJhbmdlIGVuZCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBzdGFydFwiLFxuICAgIHBhdGg6IFtcInBvcnRzRW5kXCJdLFxufSk7XG5cblxuLy8gR0VUIC9hcGkvbm9kZXMgLSBGZXRjaCBhbGwgbm9kZXNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIGNvbnN0IG5vZGVzID0gYXdhaXQgcHJpc21hLm5vZGUuZmluZE1hbnkoeyBcbiAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImRlc2NcIiB9LFxuICAgICAgLy8gSW5jbHVkZSBzZXJ2ZXIgY291bnQgaW4gdGhlIGZ1dHVyZVxuICB9KTtcbiAgLy8gSW4gYSByZWFsIGFwcCwgeW91IHdvdWxkIGFsc28gY2hlY2sgdGhlIGFjdHVhbCBzdGF0dXMgb2YgdGhlIGRhZW1vblxuICBjb25zdCBub2Rlc1dpdGhTdGF0dXMgPSBub2Rlcy5tYXAobiA9PiAoey4uLm4sIHN0YXR1czogXCJPbmxpbmVcIiBhcyBcIk9ubGluZVwiIHwgXCJPZmZsaW5lXCIsIHNlcnZlcnM6IDB9KSlcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKG5vZGVzV2l0aFN0YXR1cyk7XG59XG5cbi8vIFBPU1QgL2FwaS9ub2RlcyAtIEFkZCBhIG5ldyBub2RlXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gbm9kZVNjaGVtYS5zYWZlUGFyc2UoYm9keSk7XG5cbiAgICBpZiAoIXZhbGlkYXRpb24uc3VjY2Vzcykge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IHZhbGlkYXRpb24uZXJyb3IuZmxhdHRlbigpLmZpZWxkRXJyb3JzIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBuYW1lLCBsb2NhdGlvbiwgZnFkbiwgZGFlbW9uUG9ydCwgdXNlU1NMLCBtZW1vcnksIGRpc2ssIHBvcnRzU3RhcnQsIHBvcnRzRW5kLCBvcywgdmlzaWJpbGl0eSB9ID0gdmFsaWRhdGlvbi5kYXRhO1xuXG4gICAgY29uc3Qgbm9kZSA9IGF3YWl0IHByaXNtYS5ub2RlLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGxvY2F0aW9uLFxuICAgICAgICBmcWRuLFxuICAgICAgICBkYWVtb25Qb3J0LFxuICAgICAgICB1c2VTU0wsXG4gICAgICAgIG1lbW9yeSxcbiAgICAgICAgZGlzayxcbiAgICAgICAgcG9ydHM6IHsgc3RhcnQ6IHBvcnRzU3RhcnQsIGVuZDogcG9ydHNFbmQgfSwgLy8gU3RvcmVkIGFzIEpTT05cbiAgICAgICAgb3MsXG4gICAgICAgIHZpc2liaWxpdHksXG4gICAgICAgIHV1aWQ6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgICAgIHRva2VuOiBjcnlwdG8ucmFuZG9tVVVJRCgpLCAvLyBFeGFtcGxlIHRva2VuXG4gICAgICAgIHRva2VuSWQ6IGNyeXB0by5yYW5kb21VVUlEKCkuc3Vic3RyaW5nKDAsIDgpLCAvLyBFeGFtcGxlIHRva2VuIGlkXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKG5vZGUpO1xuICB9IGNhdGNoKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsicHJpc21hIiwiTmV4dFJlc3BvbnNlIiwieiIsIm5vZGVTY2hlbWEiLCJvYmplY3QiLCJuYW1lIiwic3RyaW5nIiwibWluIiwibWVzc2FnZSIsImxvY2F0aW9uIiwiZnFkbiIsIm9zIiwiZW51bSIsInZpc2liaWxpdHkiLCJkYWVtb25Qb3J0IiwiY29lcmNlIiwibnVtYmVyIiwiaW50IiwicG9zaXRpdmUiLCJ1c2VTU0wiLCJwcmVwcm9jZXNzIiwidmFsIiwiYm9vbGVhbiIsIm1lbW9yeSIsImRpc2siLCJwb3J0c1N0YXJ0IiwicG9ydHNFbmQiLCJyZWZpbmUiLCJkYXRhIiwicGF0aCIsIkdFVCIsIm5vZGVzIiwibm9kZSIsImZpbmRNYW55Iiwib3JkZXJCeSIsImNyZWF0ZWRBdCIsIm5vZGVzV2l0aFN0YXR1cyIsIm1hcCIsIm4iLCJzdGF0dXMiLCJzZXJ2ZXJzIiwianNvbiIsIlBPU1QiLCJyZXEiLCJib2R5IiwidmFsaWRhdGlvbiIsInNhZmVQYXJzZSIsInN1Y2Nlc3MiLCJlcnJvciIsImZsYXR0ZW4iLCJmaWVsZEVycm9ycyIsImNyZWF0ZSIsInBvcnRzIiwic3RhcnQiLCJlbmQiLCJ1dWlkIiwiY3J5cHRvIiwicmFuZG9tVVVJRCIsInRva2VuIiwidG9rZW5JZCIsInN1YnN0cmluZyIsImUiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/nodes/route.tsx\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// lib/prisma.ts\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdCQUFnQjtBQUM4QjtBQUU5QyxNQUFNQyxrQkFBa0JDO0FBSXhCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQTtBQUV6RCxJQUFJSSxJQUFxQyxFQUFFSCxnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIi9ob21lL3VzZXIvc3R1ZGlvL2xpYi9wcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL3ByaXNtYS50c1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMge1xuICBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpc21hOyJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fnodes%2Froute&page=%2Fapi%2Fnodes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnodes%2Froute.tsx&appDir=%2Fhome%2Fuser%2Fstudio%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fuser%2Fstudio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fnodes%2Froute&page=%2Fapi%2Fnodes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnodes%2Froute.tsx&appDir=%2Fhome%2Fuser%2Fstudio%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fuser%2Fstudio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_user_studio_app_api_nodes_route_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/nodes/route.tsx */ \"(rsc)/./app/api/nodes/route.tsx\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/nodes/route\",\n        pathname: \"/api/nodes\",\n        filename: \"route\",\n        bundlePath: \"app/api/nodes/route\"\n    },\n    resolvedPagePath: \"/home/user/studio/app/api/nodes/route.tsx\",\n    nextConfigOutput,\n    userland: _home_user_studio_app_api_nodes_route_tsx__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZub2RlcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbm9kZXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZub2RlcyUyRnJvdXRlLnRzeCZhcHBEaXI9JTJGaG9tZSUyRnVzZXIlMkZzdHVkaW8lMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRmhvbWUlMkZ1c2VyJTJGc3R1ZGlvJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNQO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS91c2VyL3N0dWRpby9hcHAvYXBpL25vZGVzL3JvdXRlLnRzeFwiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbm9kZXMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9ub2Rlc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbm9kZXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvaG9tZS91c2VyL3N0dWRpby9hcHAvYXBpL25vZGVzL3JvdXRlLnRzeFwiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fnodes%2Froute&page=%2Fapi%2Fnodes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnodes%2Froute.tsx&appDir=%2Fhome%2Fuser%2Fstudio%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fuser%2Fstudio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fnodes%2Froute&page=%2Fapi%2Fnodes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fnodes%2Froute.tsx&appDir=%2Fhome%2Fuser%2Fstudio%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fuser%2Fstudio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
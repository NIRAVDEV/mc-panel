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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v4/classic/schemas.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v4/classic/coerce.js\");\n\n\n\nconst nodeSchema = zod__WEBPACK_IMPORTED_MODULE_2__.object({\n    name: zod__WEBPACK_IMPORTED_MODULE_2__.string().min(1, {\n        message: \"Name is required\"\n    }),\n    locationId: zod__WEBPACK_IMPORTED_MODULE_2__.string().min(1, {\n        message: \"Location is required\"\n    }),\n    fqdn: zod__WEBPACK_IMPORTED_MODULE_2__.string().min(1, {\n        message: \"FQDN is required\"\n    }),\n    os: zod__WEBPACK_IMPORTED_MODULE_2__[\"enum\"]([\n        \"debian\",\n        \"nixos\"\n    ]),\n    visibility: zod__WEBPACK_IMPORTED_MODULE_2__[\"enum\"]([\n        \"Public\",\n        \"Private\"\n    ]),\n    daemonPort: zod__WEBPACK_IMPORTED_MODULE_3__.number().int().positive(),\n    daemonSftpPort: zod__WEBPACK_IMPORTED_MODULE_3__.number().int().positive(),\n    useSSL: zod__WEBPACK_IMPORTED_MODULE_2__.preprocess((val)=>val === 'on' || val === 'true' || val === true, zod__WEBPACK_IMPORTED_MODULE_2__.boolean()),\n    behindProxy: zod__WEBPACK_IMPORTED_MODULE_2__.preprocess((val)=>val === 'on' || val === 'true' || val === true, zod__WEBPACK_IMPORTED_MODULE_2__.boolean()),\n    memory: zod__WEBPACK_IMPORTED_MODULE_3__.number().int().positive(),\n    disk: zod__WEBPACK_IMPORTED_MODULE_3__.number().int().positive(),\n    portsStart: zod__WEBPACK_IMPORTED_MODULE_3__.number().int().positive(),\n    portsEnd: zod__WEBPACK_IMPORTED_MODULE_3__.number().int().positive()\n}).refine((data)=>data.portsEnd > data.portsStart, {\n    message: \"Port range end must be greater than start\",\n    path: [\n        \"portsEnd\"\n    ]\n});\n// GET /api/nodes - Fetch all nodes\nasync function GET() {\n    const nodes = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].node.findMany({\n        orderBy: {\n            createdAt: \"desc\"\n        },\n        include: {\n            location: true\n        }\n    });\n    // In a real app, you would also check the actual status of the daemon\n    const nodesWithStatus = nodes.map((n)=>({\n            ...n,\n            status: \"Online\",\n            servers: 0,\n            location: n.location.name\n        }));\n    return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(nodesWithStatus);\n}\n// POST /api/nodes - Add a new node\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const validation = nodeSchema.safeParse(body);\n        if (!validation.success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: validation.error.flatten().fieldErrors\n            }, {\n                status: 400\n            });\n        }\n        const { name, locationId, fqdn, daemonPort, daemonSftpPort, useSSL, behindProxy, memory, disk, portsStart, portsEnd, os, visibility } = validation.data;\n        const node = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].node.create({\n            data: {\n                name,\n                locationId,\n                fqdn,\n                daemonPort,\n                daemonSftpPort,\n                useSSL,\n                behindProxy,\n                memory,\n                disk,\n                ports: {\n                    start: portsStart,\n                    end: portsEnd\n                },\n                os,\n                visibility,\n                uuid: crypto.randomUUID(),\n                token: crypto.randomUUID(),\n                tokenId: crypto.randomUUID().substring(0, 8)\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(node);\n    } catch (e) {\n        console.error(e);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOEIsT0FBTztvQkFBRUMsT0FBTzlCO29CQUFZK0IsS0FBSzlCO2dCQUFTO2dCQUMxQ2pCO2dCQUNBRTtnQkFDQThDLE1BQU1DLE9BQU9DLFVBQVU7Z0JBQ3ZCQyxPQUFPRixPQUFPQyxVQUFVO2dCQUN4QkUsU0FBU0gsT0FBT0MsVUFBVSxHQUFHRyxTQUFTLENBQUMsR0FBRztZQUM1QztRQUNGO1FBRUEsT0FBTy9ELHFEQUFZQSxDQUFDNEMsSUFBSSxDQUFDWDtJQUMzQixFQUFFLE9BQU0rQixHQUFHO1FBQ1BDLFFBQVFkLEtBQUssQ0FBQ2E7UUFDZCxPQUFPaEUscURBQVlBLENBQUM0QyxJQUFJLENBQUM7WUFBRU8sT0FBTztRQUF3QixHQUFHO1lBQUVULFFBQVE7UUFBSTtJQUMvRTtBQUNGIiwic291cmNlcyI6WyIvaG9tZS91c2VyL3N0dWRpby9hcHAvYXBpL25vZGVzL3JvdXRlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IHByaXNtYSBmcm9tIFwiLi4vLi4vLi4vbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyB6IH0gZnJvbSBcInpvZFwiO1xuXG5jb25zdCBub2RlU2NoZW1hID0gei5vYmplY3Qoe1xuICBuYW1lOiB6LnN0cmluZygpLm1pbigxLCB7IG1lc3NhZ2U6IFwiTmFtZSBpcyByZXF1aXJlZFwiIH0pLFxuICBsb2NhdGlvbklkOiB6LnN0cmluZygpLm1pbigxLCB7IG1lc3NhZ2U6IFwiTG9jYXRpb24gaXMgcmVxdWlyZWRcIiB9KSxcbiAgZnFkbjogei5zdHJpbmcoKS5taW4oMSwgeyBtZXNzYWdlOiBcIkZRRE4gaXMgcmVxdWlyZWRcIiB9KSxcbiAgb3M6IHouZW51bShbXCJkZWJpYW5cIiwgXCJuaXhvc1wiXSksXG4gIHZpc2liaWxpdHk6IHouZW51bShbXCJQdWJsaWNcIiwgXCJQcml2YXRlXCJdKSxcbiAgZGFlbW9uUG9ydDogei5jb2VyY2UubnVtYmVyKCkuaW50KCkucG9zaXRpdmUoKSxcbiAgZGFlbW9uU2Z0cFBvcnQ6IHouY29lcmNlLm51bWJlcigpLmludCgpLnBvc2l0aXZlKCksXG4gIHVzZVNTTDogei5wcmVwcm9jZXNzKCh2YWwpID0+IHZhbCA9PT0gJ29uJyB8fCB2YWwgPT09ICd0cnVlJyB8fCB2YWwgPT09IHRydWUsIHouYm9vbGVhbigpKSxcbiAgYmVoaW5kUHJveHk6IHoucHJlcHJvY2VzcygodmFsKSA9PiB2YWwgPT09ICdvbicgfHwgdmFsID09PSAndHJ1ZScgfHwgdmFsID09PSB0cnVlLCB6LmJvb2xlYW4oKSksXG4gIG1lbW9yeTogei5jb2VyY2UubnVtYmVyKCkuaW50KCkucG9zaXRpdmUoKSxcbiAgZGlzazogei5jb2VyY2UubnVtYmVyKCkuaW50KCkucG9zaXRpdmUoKSxcbiAgcG9ydHNTdGFydDogei5jb2VyY2UubnVtYmVyKCkuaW50KCkucG9zaXRpdmUoKSxcbiAgcG9ydHNFbmQ6IHouY29lcmNlLm51bWJlcigpLmludCgpLnBvc2l0aXZlKCksXG59KS5yZWZpbmUoZGF0YSA9PiBkYXRhLnBvcnRzRW5kID4gZGF0YS5wb3J0c1N0YXJ0LCB7XG4gICAgbWVzc2FnZTogXCJQb3J0IHJhbmdlIGVuZCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBzdGFydFwiLFxuICAgIHBhdGg6IFtcInBvcnRzRW5kXCJdLFxufSk7XG5cblxuLy8gR0VUIC9hcGkvbm9kZXMgLSBGZXRjaCBhbGwgbm9kZXNcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIGNvbnN0IG5vZGVzID0gYXdhaXQgcHJpc21hLm5vZGUuZmluZE1hbnkoeyBcbiAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImRlc2NcIiB9LFxuICAgICAgaW5jbHVkZTogeyBsb2NhdGlvbjogdHJ1ZSB9LFxuICB9KTtcbiAgLy8gSW4gYSByZWFsIGFwcCwgeW91IHdvdWxkIGFsc28gY2hlY2sgdGhlIGFjdHVhbCBzdGF0dXMgb2YgdGhlIGRhZW1vblxuICBjb25zdCBub2Rlc1dpdGhTdGF0dXMgPSBub2Rlcy5tYXAobiA9PiAoey4uLm4sIHN0YXR1czogXCJPbmxpbmVcIiBhcyBcIk9ubGluZVwiIHwgXCJPZmZsaW5lXCIsIHNlcnZlcnM6IDAsIGxvY2F0aW9uOiBuLmxvY2F0aW9uLm5hbWV9KSlcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKG5vZGVzV2l0aFN0YXR1cyk7XG59XG5cbi8vIFBPU1QgL2FwaS9ub2RlcyAtIEFkZCBhIG5ldyBub2RlXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLmpzb24oKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gbm9kZVNjaGVtYS5zYWZlUGFyc2UoYm9keSk7XG5cbiAgICBpZiAoIXZhbGlkYXRpb24uc3VjY2Vzcykge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IHZhbGlkYXRpb24uZXJyb3IuZmxhdHRlbigpLmZpZWxkRXJyb3JzIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBuYW1lLCBsb2NhdGlvbklkLCBmcWRuLCBkYWVtb25Qb3J0LCBkYWVtb25TZnRwUG9ydCwgdXNlU1NMLCBiZWhpbmRQcm94eSwgbWVtb3J5LCBkaXNrLCBwb3J0c1N0YXJ0LCBwb3J0c0VuZCwgb3MsIHZpc2liaWxpdHkgfSA9IHZhbGlkYXRpb24uZGF0YTtcblxuICAgIGNvbnN0IG5vZGUgPSBhd2FpdCBwcmlzbWEubm9kZS5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBuYW1lLFxuICAgICAgICBsb2NhdGlvbklkLFxuICAgICAgICBmcWRuLFxuICAgICAgICBkYWVtb25Qb3J0LFxuICAgICAgICBkYWVtb25TZnRwUG9ydCxcbiAgICAgICAgdXNlU1NMLFxuICAgICAgICBiZWhpbmRQcm94eSxcbiAgICAgICAgbWVtb3J5LFxuICAgICAgICBkaXNrLFxuICAgICAgICBwb3J0czogeyBzdGFydDogcG9ydHNTdGFydCwgZW5kOiBwb3J0c0VuZCB9LCAvLyBTdG9yZWQgYXMgSlNPTlxuICAgICAgICBvcyxcbiAgICAgICAgdmlzaWJpbGl0eSxcbiAgICAgICAgdXVpZDogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICAgICAgdG9rZW46IGNyeXB0by5yYW5kb21VVUlEKCksIC8vIEV4YW1wbGUgdG9rZW5cbiAgICAgICAgdG9rZW5JZDogY3J5cHRvLnJhbmRvbVVVSUQoKS5zdWJzdHJpbmcoMCwgOCksIC8vIEV4YW1wbGUgdG9rZW4gaWRcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24obm9kZSk7XG4gIH0gY2F0Y2goZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkludGVybmFsIHNlcnZlciBlcnJvclwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJwcmlzbWEiLCJOZXh0UmVzcG9uc2UiLCJ6Iiwibm9kZVNjaGVtYSIsIm9iamVjdCIsIm5hbWUiLCJzdHJpbmciLCJtaW4iLCJtZXNzYWdlIiwibG9jYXRpb25JZCIsImZxZG4iLCJvcyIsImVudW0iLCJ2aXNpYmlsaXR5IiwiZGFlbW9uUG9ydCIsImNvZXJjZSIsIm51bWJlciIsImludCIsInBvc2l0aXZlIiwiZGFlbW9uU2Z0cFBvcnQiLCJ1c2VTU0wiLCJwcmVwcm9jZXNzIiwidmFsIiwiYm9vbGVhbiIsImJlaGluZFByb3h5IiwibWVtb3J5IiwiZGlzayIsInBvcnRzU3RhcnQiLCJwb3J0c0VuZCIsInJlZmluZSIsImRhdGEiLCJwYXRoIiwiR0VUIiwibm9kZXMiLCJub2RlIiwiZmluZE1hbnkiLCJvcmRlckJ5IiwiY3JlYXRlZEF0IiwiaW5jbHVkZSIsImxvY2F0aW9uIiwibm9kZXNXaXRoU3RhdHVzIiwibWFwIiwibiIsInN0YXR1cyIsInNlcnZlcnMiLCJqc29uIiwiUE9TVCIsInJlcSIsImJvZHkiLCJ2YWxpZGF0aW9uIiwic2FmZVBhcnNlIiwic3VjY2VzcyIsImVycm9yIiwiZmxhdHRlbiIsImZpZWxkRXJyb3JzIiwiY3JlYXRlIiwicG9ydHMiLCJzdGFydCIsImVuZCIsInV1aWQiLCJjcnlwdG8iLCJyYW5kb21VVUlEIiwidG9rZW4iLCJ0b2tlbklkIiwic3Vic3RyaW5nIiwiZSIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/nodes/route.tsx\n");

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
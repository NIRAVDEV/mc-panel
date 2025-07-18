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
exports.id = "app/api/locations/route";
exports.ids = ["app/api/locations/route"];
exports.modules = {

/***/ "(rsc)/./app/api/locations/route.tsx":
/*!*************************************!*\
  !*** ./app/api/locations/route.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v4/classic/schemas.js\");\n\n\n\nconst locationSchema = zod__WEBPACK_IMPORTED_MODULE_2__.object({\n    name: zod__WEBPACK_IMPORTED_MODULE_2__.string().min(1, {\n        message: \"Name is required\"\n    }),\n    shortCode: zod__WEBPACK_IMPORTED_MODULE_2__.string().min(1, {\n        message: \"Short code is required\"\n    })\n});\n// GET /api/locations - Fetch all locations\nasync function GET() {\n    const locations = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].location.findMany({\n        orderBy: {\n            createdAt: \"asc\"\n        }\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(locations);\n}\n// POST /api/locations - Add a new location\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const validation = locationSchema.safeParse(body);\n        if (!validation.success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: validation.error.flatten().fieldErrors\n            }, {\n                status: 400\n            });\n        }\n        const { name, shortCode } = validation.data;\n        // Check if shortCode already exists\n        const existing = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].location.findUnique({\n            where: {\n                shortCode\n            }\n        });\n        if (existing) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"A location with this short code already exists.\"\n            }, {\n                status: 409\n            });\n        }\n        const location = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].location.create({\n            data: {\n                name,\n                shortCode\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json(location, {\n            status: 201\n        });\n    } catch (e) {\n        console.error(e);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2xvY2F0aW9ucy9yb3V0ZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDeUM7QUFDRTtBQUNuQjtBQUV4QixNQUFNRyxpQkFBaUJELHVDQUFRLENBQUM7SUFDOUJHLE1BQU1ILHVDQUFRLEdBQUdLLEdBQUcsQ0FBQyxHQUFHO1FBQUVDLFNBQVM7SUFBbUI7SUFDdERDLFdBQVdQLHVDQUFRLEdBQUdLLEdBQUcsQ0FBQyxHQUFHO1FBQUVDLFNBQVM7SUFBeUI7QUFDbkU7QUFFQSwyQ0FBMkM7QUFDcEMsZUFBZUU7SUFDcEIsTUFBTUMsWUFBWSxNQUFNWCxtREFBTUEsQ0FBQ1ksUUFBUSxDQUFDQyxRQUFRLENBQUM7UUFDN0NDLFNBQVM7WUFBRUMsV0FBVztRQUFNO0lBQ2hDO0lBQ0EsT0FBT2QscURBQVlBLENBQUNlLElBQUksQ0FBQ0w7QUFDM0I7QUFFQSwyQ0FBMkM7QUFDcEMsZUFBZU0sS0FBS0MsR0FBWTtJQUNyQyxJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNRCxJQUFJRixJQUFJO1FBQzNCLE1BQU1JLGFBQWFqQixlQUFla0IsU0FBUyxDQUFDRjtRQUU1QyxJQUFJLENBQUNDLFdBQVdFLE9BQU8sRUFBRTtZQUN2QixPQUFPckIscURBQVlBLENBQUNlLElBQUksQ0FBQztnQkFBRU8sT0FBT0gsV0FBV0csS0FBSyxDQUFDQyxPQUFPLEdBQUdDLFdBQVc7WUFBQyxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDNUY7UUFFQSxNQUFNLEVBQUVyQixJQUFJLEVBQUVJLFNBQVMsRUFBRSxHQUFHVyxXQUFXTyxJQUFJO1FBRTNDLG9DQUFvQztRQUNwQyxNQUFNQyxXQUFXLE1BQU01QixtREFBTUEsQ0FBQ1ksUUFBUSxDQUFDaUIsVUFBVSxDQUFDO1lBQUVDLE9BQU87Z0JBQUVyQjtZQUFVO1FBQUU7UUFDekUsSUFBSW1CLFVBQVU7WUFDVixPQUFPM0IscURBQVlBLENBQUNlLElBQUksQ0FBQztnQkFBRU8sT0FBTztZQUFrRCxHQUFHO2dCQUFFRyxRQUFRO1lBQUk7UUFDekc7UUFFQSxNQUFNZCxXQUFXLE1BQU1aLG1EQUFNQSxDQUFDWSxRQUFRLENBQUNtQixNQUFNLENBQUM7WUFDNUNKLE1BQU07Z0JBQUV0QjtnQkFBTUk7WUFBVTtRQUMxQjtRQUVBLE9BQU9SLHFEQUFZQSxDQUFDZSxJQUFJLENBQUNKLFVBQVU7WUFBRWMsUUFBUTtRQUFJO0lBQ25ELEVBQUUsT0FBTU0sR0FBRztRQUNQQyxRQUFRVixLQUFLLENBQUNTO1FBQ2QsT0FBTy9CLHFEQUFZQSxDQUFDZSxJQUFJLENBQUM7WUFBRU8sT0FBTztRQUF3QixHQUFHO1lBQUVHLFFBQVE7UUFBSTtJQUMvRTtBQUNGIiwic291cmNlcyI6WyIvaG9tZS91c2VyL3N0dWRpby9hcHAvYXBpL2xvY2F0aW9ucy9yb3V0ZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgcHJpc21hIGZyb20gXCIuLi8uLi8uLi9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbmNvbnN0IGxvY2F0aW9uU2NoZW1hID0gei5vYmplY3Qoe1xuICBuYW1lOiB6LnN0cmluZygpLm1pbigxLCB7IG1lc3NhZ2U6IFwiTmFtZSBpcyByZXF1aXJlZFwiIH0pLFxuICBzaG9ydENvZGU6IHouc3RyaW5nKCkubWluKDEsIHsgbWVzc2FnZTogXCJTaG9ydCBjb2RlIGlzIHJlcXVpcmVkXCIgfSksXG59KTtcblxuLy8gR0VUIC9hcGkvbG9jYXRpb25zIC0gRmV0Y2ggYWxsIGxvY2F0aW9uc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgY29uc3QgbG9jYXRpb25zID0gYXdhaXQgcHJpc21hLmxvY2F0aW9uLmZpbmRNYW55KHsgXG4gICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJhc2NcIiB9LFxuICB9KTtcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGxvY2F0aW9ucyk7XG59XG5cbi8vIFBPU1QgL2FwaS9sb2NhdGlvbnMgLSBBZGQgYSBuZXcgbG9jYXRpb25cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xuICAgIGNvbnN0IHZhbGlkYXRpb24gPSBsb2NhdGlvblNjaGVtYS5zYWZlUGFyc2UoYm9keSk7XG5cbiAgICBpZiAoIXZhbGlkYXRpb24uc3VjY2Vzcykge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IHZhbGlkYXRpb24uZXJyb3IuZmxhdHRlbigpLmZpZWxkRXJyb3JzIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBuYW1lLCBzaG9ydENvZGUgfSA9IHZhbGlkYXRpb24uZGF0YTtcblxuICAgIC8vIENoZWNrIGlmIHNob3J0Q29kZSBhbHJlYWR5IGV4aXN0c1xuICAgIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgcHJpc21hLmxvY2F0aW9uLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBzaG9ydENvZGUgfSB9KTtcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiQSBsb2NhdGlvbiB3aXRoIHRoaXMgc2hvcnQgY29kZSBhbHJlYWR5IGV4aXN0cy5cIiB9LCB7IHN0YXR1czogNDA5IH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGxvY2F0aW9uID0gYXdhaXQgcHJpc21hLmxvY2F0aW9uLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7IG5hbWUsIHNob3J0Q29kZSB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGxvY2F0aW9uLCB7IHN0YXR1czogMjAxIH0pO1xuICB9IGNhdGNoKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsicHJpc21hIiwiTmV4dFJlc3BvbnNlIiwieiIsImxvY2F0aW9uU2NoZW1hIiwib2JqZWN0IiwibmFtZSIsInN0cmluZyIsIm1pbiIsIm1lc3NhZ2UiLCJzaG9ydENvZGUiLCJHRVQiLCJsb2NhdGlvbnMiLCJsb2NhdGlvbiIsImZpbmRNYW55Iiwib3JkZXJCeSIsImNyZWF0ZWRBdCIsImpzb24iLCJQT1NUIiwicmVxIiwiYm9keSIsInZhbGlkYXRpb24iLCJzYWZlUGFyc2UiLCJzdWNjZXNzIiwiZXJyb3IiLCJmbGF0dGVuIiwiZmllbGRFcnJvcnMiLCJzdGF0dXMiLCJkYXRhIiwiZXhpc3RpbmciLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJjcmVhdGUiLCJlIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/locations/route.tsx\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// lib/prisma.ts\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdCQUFnQjtBQUM4QjtBQUU5QyxNQUFNQyxrQkFBa0JDO0FBSXhCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQTtBQUV6RCxJQUFJSSxJQUFxQyxFQUFFSCxnQkFBZ0JFLE1BQU0sR0FBR0E7QUFFcEUsaUVBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIi9ob21lL3VzZXIvc3R1ZGlvL2xpYi9wcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL3ByaXNtYS50c1xuaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMge1xuICBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpc21hOyJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flocations%2Froute&page=%2Fapi%2Flocations%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flocations%2Froute.tsx&appDir=%2Fhome%2Fuser%2Fstudio%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fuser%2Fstudio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flocations%2Froute&page=%2Fapi%2Flocations%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flocations%2Froute.tsx&appDir=%2Fhome%2Fuser%2Fstudio%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fuser%2Fstudio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_user_studio_app_api_locations_route_tsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/locations/route.tsx */ \"(rsc)/./app/api/locations/route.tsx\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/locations/route\",\n        pathname: \"/api/locations\",\n        filename: \"route\",\n        bundlePath: \"app/api/locations/route\"\n    },\n    resolvedPagePath: \"/home/user/studio/app/api/locations/route.tsx\",\n    nextConfigOutput,\n    userland: _home_user_studio_app_api_locations_route_tsx__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZsb2NhdGlvbnMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmxvY2F0aW9ucyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmxvY2F0aW9ucyUyRnJvdXRlLnRzeCZhcHBEaXI9JTJGaG9tZSUyRnVzZXIlMkZzdHVkaW8lMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRmhvbWUlMkZ1c2VyJTJGc3R1ZGlvJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNIO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS91c2VyL3N0dWRpby9hcHAvYXBpL2xvY2F0aW9ucy9yb3V0ZS50c3hcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2xvY2F0aW9ucy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2xvY2F0aW9uc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbG9jYXRpb25zL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUvdXNlci9zdHVkaW8vYXBwL2FwaS9sb2NhdGlvbnMvcm91dGUudHN4XCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flocations%2Froute&page=%2Fapi%2Flocations%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flocations%2Froute.tsx&appDir=%2Fhome%2Fuser%2Fstudio%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fuser%2Fstudio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Flocations%2Froute&page=%2Fapi%2Flocations%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Flocations%2Froute.tsx&appDir=%2Fhome%2Fuser%2Fstudio%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fuser%2Fstudio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
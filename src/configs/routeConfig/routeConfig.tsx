import { RouteProps } from "react-router-dom"
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage"
import { HomePageAsync } from "../../pages/HomePage/HomePage.async"
import { GamePageAsync } from "../../pages/GamePage/GamePage.async"
import { StartPageAsync } from "../../pages/StartPage/StartPage.async"
import { ShopPageAsync } from "../../pages/ShopPage/ShopPage.async"
import { RatePageAsync } from "../../pages/RatePage/RatePage.async"

export enum AppRoutes {
    HOME = 'home',
    GAME = 'game',
    START = 'start',
    RATE = 'rate',
    SHOP = 'shop',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.HOME]: '/',
    [AppRoutes.GAME]: '/game',
    [AppRoutes.START]: '/start',
    [AppRoutes.RATE]: '/rate',
    [AppRoutes.SHOP]: '/shop',
    [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.HOME]: {
        path: RoutePath.home,
        element: <HomePageAsync />
    },
    [AppRoutes.GAME]: {
        path: RoutePath.game,
        element: <GamePageAsync />
    },
    [AppRoutes.START]: {
        path: RoutePath.start,
        element: <StartPageAsync />
    },
    [AppRoutes.RATE]: {
        path: RoutePath.rate,
        element: <RatePageAsync />
    },
    [AppRoutes.SHOP]: {
        path: RoutePath.shop,
        element: <ShopPageAsync />
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />
    }
}
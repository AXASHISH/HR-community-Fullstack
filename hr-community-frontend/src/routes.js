// routes/routes.js - Using lazy loading for better performance
import { lazy } from "react";

// Lazy load all page components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NominationForm = lazy(() => import("./pages/NominationForm"));
const VotingPage = lazy(() => import("./pages/VotingPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Community = lazy(() => import("./pages/Community"));
const ViewNominiees = lazy(() => import("./pages/ViewNominiees"));
const HrSummit = lazy(() => import("./pages/HrSummit"));
const ActivityDetail = lazy(() => import("./components/Home/ActivityDetails"));
const HrAwardsLanding = lazy(() => import("./pages/HrAwardsLanding"));
const HrSummitLanding = lazy(() => import("./pages/HrSummitLanding"));
const Agenda = lazy(() => import("./components/Agenda"));
const HorizontalImageGallery = lazy(() => import("./components/Pastevent"));
const AdvisoryBoard = lazy(() => import("./components/Home/AdvisoryBoard"));
const Members = lazy(() => import("./components/Home/Members"));
const MissionVision = lazy(() => import("./components/Home/MissionVision"));
const WinnerDetails = lazy(() => import("./pages/WinnderDetails"));
// Layout flags: "public" or "private"
export const routes = [
  { path: "/", element: Home, layout: "public" },
  { path: "/login", element: Login, layout: "public" },
  { path: "/community", element: Community, layout: "public" },
  { path: "/hr-summit", element: HrSummitLanding, layout: "public" },
  { path: "/hr-awards", element: HrAwardsLanding, layout: "public" },
  { path: "/hr-summit/agenda", element: Agenda, layout: "public" },
  {
    path: "/hr-summit/past-events",
    element: HorizontalImageGallery,
    layout: "public",
  },
  { path: "/advisory-board", element: AdvisoryBoard, layout: "public" },
  { path: "/members", element: Members, layout: "public" },
  { path: "/mission-vision", element: MissionVision, layout: "public" },
  { path: "/winner-by-category/:id", element: WinnerDetails, layout: "public" },

  {
    path: "/votingpage/:leader_id/:category_id",
    element: VotingPage,
    layout: "public",
  },
  { path: "/nominees/:category_id", element: ViewNominiees, layout: "public" },
  { path: "/activity/:id", element: ActivityDetail, layout: "public" },

  // { path: "/dashboard", element: Dashboard, layout: "private" },
  { path: "/nomination-form", element: HrSummit, layout: "private" },
  // { path: "/nominate/:nominationId", element: NominationForm, layout: "private" },
  { path: "*", element: NotFound, layout: "public" },
];

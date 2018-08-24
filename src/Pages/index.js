import HomePage from "./Home";
import PlaylistsPage from "./Playlists/index";
import UserSettingsPage from "./UserSettings/index";
import UploadPage from "./Upload/index";

export default [
  {
    name: "Home",
    iconName: "home",
    path: "/",
    component: HomePage
  },
  {
    name: "Playlists",
    iconName: "list",
    path: "/playlists",
    component: PlaylistsPage
  },
  {
    name: "User settings",
    iconName: "cog",
    path: "/settings",
    component: UserSettingsPage
  },
  {
    name: "Upload music",
    iconName: "upload",
    path: "/upload",
    component: UploadPage
  }
];

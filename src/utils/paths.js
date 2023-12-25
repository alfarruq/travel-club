import BoardMenu from "../components/BoardMenu";
import ClubMenu from "../components/ClubMenu";
import MemberMenu from "../components/MemberMenu";
import MemberShipMenu from "../components/MemberShip";
import Post from "../components/Post";

export const home_path = [
    {
      id: 1,
      path: "/clubmenu",
      name: "Club Menu",
      hidden: false,
      Element: <ClubMenu/>,
      search: "?",
    },
    {
      id: 2,
      path: "/membermenu",
      name: "Member Menu",
      hidden: false,
      Element: <MemberMenu/>,
      search: "?",
    },
    {
      id: 3,
      path: "/boardmenu",
      name: "Board Menu",
      hidden: false,
      Element: <BoardMenu/>,
      search: "?",
    },
    {
      id: 4,
      path: "/membership",
      name: "Member Ship Menu",
      hidden: false,
      Element: <MemberShipMenu/>,
      search: "?",
    },
    {
      id: 5,
      path: "/post",
      name: "Post",
      hidden: false,
      Element: <Post/>,
      search: "?",
    },
];

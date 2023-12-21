import BoardMenu from "../components/BoardMenu";
import ClubMenu from "../components/ClubMenu";
import MemberMenu from "../components/MemberMenu";

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
];

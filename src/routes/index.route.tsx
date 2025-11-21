import SongListPage from "../pages/SongList.page";
import MidiEditorPage from "../pages/MidiEditor.page";
import { Navigate, useRoutes } from "react-router-dom";

const routes = [
	{
		path: "/",
		element: <Navigate to="/songs" replace />,
	},
	{
		path: "/songs",
		element: <SongListPage />,
	},
	{
		path: "/songs/:songId/editor",
		element: <MidiEditorPage />,
	},
];

export default function AppRoutes() {
	return useRoutes(routes);
}

import SongManagementPage from "../pages/songs/SongManagementPage";
import MidiEditorPage from "../pages/midi-editor/MidiEditorPage";
import { Navigate, useRoutes } from "react-router-dom";

const routes = [
	{
		path: "/",
		element: <Navigate to="/songs" replace />,
	},
	{
		path: "/songs",
		element: <SongManagementPage />,
	},
	{
		path: "/songs/:songId/editor",
		element: <MidiEditorPage />,
	},
];

export default function AppRoutes() {
	return useRoutes(routes);
}

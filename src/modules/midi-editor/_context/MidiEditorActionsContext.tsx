import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { MidiEditorActionsContextValue } from "../../../types/midi-editor.types";

const MidiEditorActionsContext = createContext<MidiEditorActionsContextValue | undefined>(undefined);

type MidiEditorProviderProps = {
	children: ReactNode;
	value: MidiEditorActionsContextValue;
};

export const MidiEditorProvider = ({ children, value }: MidiEditorProviderProps) => {
	return <MidiEditorActionsContext.Provider value={value}>{children}</MidiEditorActionsContext.Provider>;
};

export const useMidiEditorActions = () => {
	const context = useContext(MidiEditorActionsContext);

	if (!context) {
		throw new Error("useMidiEditorActions must be used within MidiEditorActionsProvider");
	}

	return context;
};

export default MidiEditorActionsContext;


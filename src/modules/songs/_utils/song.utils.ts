import { TrackType } from "../../../enums/track.enum";
export const buildTrackLabelOptions = (): TrackType[] => Object.values(TrackType);

export const TRACK_LABEL_OPTIONS = buildTrackLabelOptions();

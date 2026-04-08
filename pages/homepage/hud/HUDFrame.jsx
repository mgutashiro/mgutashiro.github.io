import FrameBase from "./FrameBase"
import { HOME_SECTIONS } from '../home.sections'

function getSectionConfig(id) {
    return HOME_SECTIONS.find((s) => s.id === id) || HOME_SECTIONS[0]
}

export default function HUDFrame({ activeSection = "intro", className=""}){
    const section = getSectionConfig(activeSection)
    const visible = !!section.hasFrame

    return (
        <div
            className={`HUDFrame hudFrame ${className}`}
            aria-hidden="true"
            data-visible={visible ? '1' : '0'}
            data-theme={section.id}
        >
            <FrameBase className="hudFrameSVG" />
        </div>
    )
}
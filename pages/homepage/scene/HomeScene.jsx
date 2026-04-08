// src/pages/homepage/scene/HomeScene.jsx
import TitleRig from './TitleRig'
import HexBackground from './HexBkgd'
import { HOME_SECTIONS } from '../home.sections.js'

export default function HomeScene({ p, activeId, tLocal, dropNow, resetTick, titleAnchorRef }) {
  return (
    <>
      <TitleRig p={p} introRange={HOME_SECTIONS[0].t} anchorRef={titleAnchorRef}/>
  

      <HexBackground p={p} />
    </>
  )
}
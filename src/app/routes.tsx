import { Routes, Route } from "react-router-dom";
import type { Location } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import MentionsLegales from "../pages/MentionsLegales";
import Accessibilite from "../pages/Accessibilite";
import PolitiqueConfidentialite from "../pages/PolitiqueConfidentialite";
import PolitiqueCookies from "../pages/PolitiqueCookies";
import CGU from "../pages/CGU";

type AppRoutesProps = {
  location?: Location;
};

export default function AppRoutes({ location }: AppRoutesProps) {
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/accessibilite" element={<Accessibilite />} />
      <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      <Route path="/politique-cookies" element={<PolitiqueCookies />} />
      <Route path="/cgu" element={<CGU />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

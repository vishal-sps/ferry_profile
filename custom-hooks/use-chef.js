import { useState, useEffect } from "react";
import { fetchUserChefProfile } from "../services/chef-api";

export default function useChef(identifier) {
  const [state, setState] = useState({});

  const getChefProfile = async (identifier) => {
    try {
      const chef = await fetchUserChefProfile(identifier);
      setState(chef);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const chef = JSON.parse(localStorage.getItem("chef"));

    if (identifier) {
      getChefProfile(identifier);
      return;
    }

    if (chef) {
      setState(chef);
      return;
    }
  }, [identifier]);

  const saveChef = (chef) => {
    if (chef) {
      localStorage.setItem("chef", JSON.stringify(chef));
      setState(chef);
      return;
    }
    throw new Error("Please add a chef");
  };

  return { saveChef, chef: state };
}

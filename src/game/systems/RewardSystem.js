import { audioManager } from "./AudioManager";

export function grantMiniGameReward(dispatch, reward) {
  dispatch({ type: "addRewards", payload: reward });
  audioManager.reward();
  return {
    ...reward,
    message: `+${reward.coins} coins and +${reward.stars} stars`,
  };
}

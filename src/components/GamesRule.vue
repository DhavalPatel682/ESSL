<template>
  <div class="center-text-align">
    <div class="basketball-league-rules">
      <h1>GAME RULES <br><br> ESSL BASKETBALL LEAGUE</h1>

      <section class="game-timing">
        <ul>
          <li>7-minute running time quarters, except the last 2 minutes of the 2nd & 4th quarter. Clock will stop for free throws & timeouts, throughout the entire game.</li>
          <li>3-minute overtime period. Each additional overtime will be 1 minute.</li>
          <li>Timeouts: 3 full and two 30-second timeouts, and 1 additional full timeout per overtime.</li>
          <li>Free throws: One-and-one for team fouls after 7 fouls, and two shots after the 10th team foul.</li>
          <li>Full court press: Teams may full court press. However, teams must defend from half-court once leading by 10 points or more.</li>
          <li>Halftime is 3 minutes long. If there is a performance or special presentation, notify the referee before the game.</li>
          <li>The game is supposed to start between 3:30 PM and 4:00 PM, depending on the District. There is a 30-minute grace period. After that, the forfeit clock will start and you will lose a point per minute. If the game starts 45 minutes late (with the permission of the hosting team), there will be no breaks in-between quarters.</li>
          <li>The home team must have an official book, clock, and scoreboard, along with 2 people working the table. Individuals working the table must be 15 years of age or older.</li>
          <li>Up to 2 assistant coaches are permitted to sit on the bench. ONLY the head coach is permitted to stand during the game.</li>
          <li>Utilize a regulation-size ball; 29.5.</li>
          <li>The game will not start without a game book, game clock, and game scoreboard. An administrative technical foul will be handed to hosting teams who are not fully equipped with their game book, game clock, and game scoreboard.</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ESSLBasketballRules',
};
</script>

<style scoped>
.center-text-align {
  display: flex;
  justify-content: center; /* Horizontally center the content */
  align-items: center; /* Vertically center the content */
  padding: 50px 20px;
}

.basketball-league-rules {
  padding: 30px 40px;
  max-width: 800px;
  width: 100%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 8px;
}

h1 {
  text-align: center;
  font-size: 2.2em;
    border-bottom: 2px solid #333; /* Adds the underline */
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;
}

section {
  margin-bottom: 20px;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
  font-size: 1.1em;
  color: #000;
}

li {
  margin-bottom: 10px;
  line-height: 1.6;
}

li:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .basketball-league-rules {
    padding: 20px;
    width: 100%;
  }

  h1 {
    font-size: 1.8em;
  }

  ul {
    font-size: 1em;
  }
}
</style>

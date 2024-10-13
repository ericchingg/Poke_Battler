import React from "react";
import './BattleLog.css';

function BattleLog({ battleEvents = []}) {
  return (
    <div className="battle-log">
      <h2>Battle Log</h2>
      {battleEvents.length === 0 ? (
        <p>No battle events yet.</p>
      ) : (
        <ul>
          {battleEvents.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BattleLog;
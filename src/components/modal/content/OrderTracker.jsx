import { useState, useEffect } from 'react';
import ProgressBar from '../../layout/ProgressBar';

const ORDER_READY_TIME = 30000;
const PROGRESS_BAR_UPDATE = 10;
const MESSAGES = [
  "Let's get started here at the Inflammation Station.",
  'Order something fried? Gotta heat that recycled mystery oil up',
  "Oh, your order isn't fried? Gotta spread that mayo-flavored soybean oil on that sandwich -- or maybe stuff it in that sushi roll.",
  'Almost done with your omega-6 creation. Wow, it looks greasy :)',
  'So close. The air reeks of boiled canola oil.',
];
export default function OrderTracker({ handleNextAction }) {
  const [isReady, setIsReady] = useState(false);
  const [remainingTime, setRemainingTime] = useState(ORDER_READY_TIME);
  const [trackerMsg, setTrackerMsg] = useState(MESSAGES[0]);

  function handleTimeDecrement(timeToSubtract) {
    setRemainingTime((prevTime) => prevTime - timeToSubtract);
  }

  useEffect(() => {
    if (remainingTime < ORDER_READY_TIME * 0.1) {
      setTrackerMsg(MESSAGES[4]);
    } else if (remainingTime < ORDER_READY_TIME * 0.3) {
      setTrackerMsg(MESSAGES[3]);
    } else if (remainingTime < ORDER_READY_TIME * 0.6) {
      setTrackerMsg(MESSAGES[2]);
    } else if (remainingTime < ORDER_READY_TIME * 0.8) {
      setTrackerMsg(MESSAGES[1]);
    } else {
      setTrackerMsg(MESSAGES[0]);
    }
    if (remainingTime <= 0) {
      setIsReady(true);
    }
  }, [remainingTime]);

  return (
    <>
      {!isReady && <h2 style={{ marginBottom: '2rem' }}>{trackerMsg}</h2>}
      {!isReady && (
        <ProgressBar
          id="order-time"
          totalTime={ORDER_READY_TIME}
          remainingTime={remainingTime}
          onDecrement={handleTimeDecrement}
          timeInterval={PROGRESS_BAR_UPDATE}
        />
      )}
      {isReady && <h2 style={{ marginBottom: '3rem' }}>Bon appetit</h2>}
      {isReady && (
        <button
          className="button"
          style={{ marginTop: '1rem' }}
          onClick={handleNextAction}
        >
          Activate belly sludge
        </button>
      )}
    </>
  );
}

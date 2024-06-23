"use client";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { BsStopwatchFill } from "react-icons/bs";

type Props = {
  seconds: number;
  minutes: number;
  hours: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: (
    offsetTimestamp?: Date | undefined,
    autoStart?: boolean | undefined
  ) => void;
  onClickRegister: () => void; // MouseEventHandler<HTMLButtonElement>は関数ではないため、voidに変換。
};

export const StopWatch = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
    onClickRegister,
  } = props;
  return (
    <>
      <Button color={""} onClick={() => setOpenModal(true)}>
        <BsStopwatchFill className="size-7" />
      </Button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        size={"md"}
        position={"top-left"}
      >
        <Modal.Header>StopWatch</Modal.Header>
        <Modal.Body>
          <div className="justify-center">
            <div className="text-center">
              <div className="text-8xl">
                <span>{hours}</span>:<span>{minutes}</span>:
                <span>{seconds}</span>
              </div>
              <p className="pb-3">{isRunning ? "Running" : "Not running"}</p>
              <div className="space-x-14">
                {!isRunning ? (
                  <button onClick={start}>Start</button>
                ) : (
                  <button onClick={pause}>Pause</button>
                )}
                <button
                  onClick={() => {
                    reset(
                      new Date(),
                      isRunning ? true : false
                    ) as unknown as React.MouseEventHandler<HTMLButtonElement>;
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        {!isRunning && (
          <Modal.Footer className="justify-center space-x-14">
            <Button
              color={"failure"}
              onClick={() => {
                onClickRegister(); // ここはonClick内のイベントが複数あるため、アロー関数のインライン関数として()が必要。
                setOpenModal(false);
              }}
              disabled={seconds === 0 ? true : false}
            >
              登録
            </Button>
            <Button color={"light"} onClick={() => setOpenModal(false)}>
              キャンセル
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

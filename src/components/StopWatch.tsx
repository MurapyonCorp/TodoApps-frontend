"use client";
import { Button, Dropdown, Modal } from "flowbite-react";
import { useState } from "react";
import { BsStopwatchFill } from "react-icons/bs";
import { useStopwatch } from "react-timer-hook";

export const StopWatch = () => {
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch();
  const [openModal, setOpenModal] = useState(false);
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
                <button onClick={start}>Start</button>
                <button onClick={pause}>Pause</button>
                <button
                  onClick={
                    reset as unknown as React.MouseEventHandler<HTMLButtonElement>
                  }
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        {!isRunning && (
          <Modal.Footer className="justify-center space-x-14">
            <Button color={"failure"} onClick={() => setOpenModal(false)}>登録</Button>
            <Button color={"light"} onClick={() => setOpenModal(false)}>キャンセル</Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

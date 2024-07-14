"use client";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { AuthCodeProps, AuthInputProps, AuthCodeRef } from "./auth-code.types";
import classNames from "classnames";

// eslint-disable-next-line react/display-name
const AuthCode = forwardRef<AuthCodeRef, AuthCodeProps>(
  (
    {
      autoFocus = true,
      length = 5,
      onChange = () => {},
      variant = "ghost",
      className,
      isDisabled,
    },
    ref
  ) => {
    if (length < 1) {
      throw new Error("تعداد ارقام باید بزرگتر از 0 باشد");
    }

    const inputsRef = useRef<Array<HTMLInputElement>>([]);

    const inputProps: AuthInputProps = {
      min: "0",
      max: "9",
      pattern: "[0-9]{1}",
    };

    useEffect(() => {
      if (autoFocus) {
        inputsRef.current[0].focus();
      }
    }, [autoFocus]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputsRef.current) {
          inputsRef.current[0].focus();
        }
      },
      clear: () => {
        if (inputsRef.current) {
          for (const inputRef of inputsRef.current) {
            inputRef.value = "";
          }
          inputsRef.current[0].focus();
        }
        sendResult();
      },
    }));

    const classes = classNames("textbox flex-1 w-1 text-center", className, {
      [`textbox-${variant}`]: variant,
    });

    const sendResult = () => {
      const result = inputsRef.current?.map((input) => input.value)?.join("");
      onChange(result);
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value, nextElementSibling },
      } = e;

      if (value.match(inputProps.pattern)) {
        if (nextElementSibling !== null) {
          (nextElementSibling as HTMLInputElement).focus();
        }
      } else {
        e.target.value = "";
      }

      sendResult();
    };

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = e;
      const target = e.target as HTMLInputElement;

      if (key === "Backspace") {
        if (target.value === "") {
          if (target.previousElementSibling !== null) {
            const previousElementSibling =
              target.previousElementSibling as HTMLInputElement;
            previousElementSibling.value = "";
            previousElementSibling.focus();
          }
        } else {
          target.value = "";
        }
      }

      sendResult();
    };

    const inputs = [];

    for (let i = 0; i < length; i++) {
      inputs.push(
        <input
          key={`auth-code-${i}`}
          maxLength={1}
          className={classes}
          disabled={isDisabled}
          ref={(element: HTMLInputElement) => {
            inputsRef.current[i] = element;
          }}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onKeyDown={handleOnKeyDown}
          {...inputProps}
        />
      );
    }

    return (
      <>
        <div className="flex flex-row-reverse gap-4 ">{inputs}</div>
      </>
    );
  }
);

export default AuthCode;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default function Form() {
  const form = useForm<UserData>({
    defaultValues: {
      userName: "",
      userEmail: "",
      userChannel: "",
      social: {
        gmail: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      age: 2,
      birthDay: new Date(),
    },
  });

  //   console.log(form);
  const { register, control, handleSubmit, formState, watch } = form;

  const [count, setcount] = useState(Math.random());

  type UserData = {
    userEmail: string;
    userName: string;
    userChannel: string;
    social: {
      gmail: string;
      facebook: string;
    };
    phoneNumbers: string[];
    age: number;
    birthDay: Date;
  };

  function getFormData(data: UserData) {
    console.log(data);
  }

  const x = watch();
  

  return (
    <>
      <div>
        <form
          noValidate
          onSubmit={handleSubmit(getFormData)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>
            <label htmlFor="name">UserName {count}</label>
            <input
              type="text"
              id="name"
              {...register("userName", {
                required: "userName is Required",
              })}
            />
            {formState.errors?.userName && (
              <p>{formState.errors?.userName?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("userEmail", {
                required: "userEmail is Required",
                // pattern: {
                //   value: /^Aa@yahoo.com$/,
                //   message: "invalid email",
                // },
                validate: {
                  user: (fieldValue) => {
                    if (fieldValue == "user@yahoo.com") {
                      return "user noooooo";
                    }
                  },
                  admin: (fieldValue) => {
                    if (fieldValue == "admin@yahoo.com") {
                      return "choose another email...";
                    }
                  },
                },
              })}
            />
            {formState.errors?.userEmail && (
              <p>{formState.errors?.userEmail?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="channel">Channel</label>
            <input
              type="text"
              id="channel"
              {...register("userChannel", {
                required: "userChannel is Required",
              })}
            />
            {formState.errors?.userChannel && (
              <p>{formState.errors?.userChannel?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="gmail">Gmail</label>
            <input
              type="text"
              id="gmail"
              {...register("social.gmail", {
                required: "gmail is required",
                validate: (fildValue) => {
                  if (fildValue !== "Mm@yahoo.com") {
                    return "Invalid Email Ya M3alem !";
                  }
                },
              })}
            />
            {formState.errors.social?.gmail && (
              <p>{formState.errors?.social?.gmail.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="facebook">facebook</label>
            <input
              type="text"
              id="facebook"
              {...register("social.facebook", {
                required: "FaceBook Is Required",
                validate: (fieldValue) => {
                  if (fieldValue !== "Mm@yahoo.com") {
                    return "invalid facebook ya wad";
                  }
                },
              })}
            />
            {formState.errors.social?.facebook && (
              <p>{formState.errors.social.facebook.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone1">phone1</label>
            <input
              type="text"
              id="phone1"
              {...register("phoneNumbers.0", {
                required: "phone1 is required",
                validate: (filedValue) => {
                  if (!/^01[0125][0-9]{8}$/.test(filedValue)) {
                    return "not valid phone 1 yasta";
                  }
                },
              })}
            />

            {formState.errors.phoneNumbers?.[0] && (
              <p>{formState.errors.phoneNumbers[0].message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone2">phone2</label>
            <input
              type="text"
              id="phone2"
              {...register("phoneNumbers.1", {
                required: "phone 1 is required",
                validate: (filedValue) => {
                  if (!/^01[1205][0-9]{8}$/.test(filedValue)) {
                    return "not valid aywa";
                  }
                },
              })}
            />
            {formState.errors.phoneNumbers?.[1] && (
              <p>{formState.errors.phoneNumbers[1].message}</p>
            )}{" "}
          </div>

          <div>
            <label htmlFor="age">age</label>
            <input
              type="number"
              id="age"
              {...register("age", {
                required: "phone 1 is required",
                valueAsNumber: true,
              })}
            />
            {formState.errors?.age && <p>{formState.errors.age?.message}</p>}
          </div>

          <div>
            <label htmlFor="birthDay">birthDay</label>
            <input
              type="date"
              id="birthDay"
              {...register("birthDay", {
                required: "birthday 1 is required",
                valueAsDate: true,
              })}
            />
            {formState.errors?.birthDay && (
              <p>{formState.errors.birthDay?.message}</p>
            )}
          </div>

          <button type="submit">Submit</button>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
}

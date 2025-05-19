import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import z, { coerce } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Form() {
  const schema = z.object({
    userName: z
      .string()
      .min(2, { message: "min length is 2 chars" })
      .max(20, { message: "max length is 20 chars" }),
    userEmail: z.string().min(1, "email is required").email({
      message: "Invalid Email",
    }),
    userChannel: z.string().min(1, "channel is required"),
    social: z.object({
      gmail: z
        .string()
        .max(15, "max chars is 15")
        .email("invalid email..")
        .min(1, "gmail is required"),
      facebook: z
        .string()
        .max(15, "max chars is 15")
        .email("invalid email..")
        .min(1, "facebook is required"),
    }),
    phoneNumbers: z.tuple(
      [
        z.string().regex(/^01[1250][0-9]{8}$/, { message: "not valid number" }),
        z.string().regex(/^01[1250][0-9]{8}$/, { message: "not valid number" }),
      ],
      { message: "Numbers should be enterd !" }
    ),
    age: z.coerce
      .number()
      .min(18, "age must be greater than or equal 18")
      .max(60, "age must be less than or equal 60"),
    birthDay: z.string().date(),
  });

  type AuthSchema = z.infer<typeof schema>;

  const form = useForm<AuthSchema>({
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
      birthDay: "",
    },
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  //   console.log(form);
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;

  const [count, setcount] = useState(Math.random());

  // type UserData = {
  //   userEmail: string;
  //   userName: string;
  //   userChannel: string;
  //   social: {
  //     gmail: string;
  //     facebook: string;
  //   };
  //   phoneNumbers: string[];
  //   age: number;
  //   birthDay: string;
  // };

  function getFormData(data: AuthSchema) {
    console.log(data);
  }

  // const x = watch("userName");
  // console.log(x);

  // const x = getValues("userName")
  // console.log(x);

  function setDataField() {
    setValue("userName", "hambozo", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  }

  const {
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;
  // console.log("touched", touchedFields);
  // console.log("dirty", dirtyFields);
  // console.log("isDirty", isDirty);
  // console.log({isSubmitted, isSubmitting, isSubmitSuccessful});

  // function onError(errors: FieldErrors<AuthSchema>) {
  //   console.log(errors);
  // }

  // reset only when successfull sumbision
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <div>
        <form
          noValidate
          onSubmit={handleSubmit(getFormData /*, {onError}*/)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>
            <label htmlFor="name">UserName</label>
            <input
              type="text"
              id="name"
              {...register("userName", {
                // required: "userName is Required",
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
                // required: "userEmail is Required",
                // pattern: {
                //   value: /^Aa@yahoo.com$/,
                //   message: "invalid email",
                // },
                // validate: {
                //   user: (fieldValue) => {
                //     if (fieldValue == "user@yahoo.com") {
                //       return "user noooooo";
                //     }
                //   },
                //   admin: (fieldValue) => {
                //     if (fieldValue == "admin@yahoo.com") {
                //       return "choose another email...";
                //     }
                //   },
                // },
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
                // required: "userChannel is Required",
                // disabled: watch("userName") === "", // if type in userName enable otherwise not
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
                // required: "gmail is required",
                // validate: (fildValue) => {
                //   if (fildValue !== "Mm@yahoo.com") {
                //     return "Invalid Email Ya M3alem !";
                //   }
                // },
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
                // required: "FaceBook Is Required",
                // validate: (fieldValue) => {
                //   if (fieldValue !== "Mm@yahoo.com") {
                //     return "invalid facebook ya wad";
                //   }
                // },
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
                // required: "phone1 is required",
                // validate: (filedValue) => {
                //   if (!/^01[0125][0-9]{8}$/.test(filedValue)) {
                //     return "not valid phone 1 yasta";
                //   }
                // },
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
                // required: "phone 1 is required",
                // validate: (filedValue) => {
                //   if (!/^01[1205][0-9]{8}$/.test(filedValue)) {
                //     return "not valid aywa";
                //   }
                // },
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
                // required: "age is required",
                // valueAsNumber: true,
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
                // required: "birthday 1 is required",
                // valueAsDate: true,
              })}
            />
            {formState.errors?.birthDay && (
              <p>{formState.errors.birthDay?.message}</p>
            )}
          </div>

          <button type="submit">Submit</button>
          <button disabled={!isDirty} type="button" onClick={() => reset()}>
            Reset
          </button>
          <button onClick={setDataField} type="button">
            change values
          </button>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
}

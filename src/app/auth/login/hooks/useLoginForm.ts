import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  dni: string;
  password: string;
};

const useLoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  const dniInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const randomDniName = useRef(
    `dni_${Math.random().toString(36).substring(2, 15)}`
  );
  const randomPasswordName = useRef(
    `password_${Math.random().toString(36).substring(2, 15)}`
  );

  useEffect(() => {
    if (dniInputRef.current) dniInputRef.current.readOnly = false;
    if (passwordInputRef.current) passwordInputRef.current.readOnly = false;
  }, []);

  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsLoading(true);

    const result = await signIn("credentials", {
      dni: data.dni,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Algo salio mal, revisa tus credenciales");
    } else if (result?.ok) {
      router.push("/books");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return {
    control,
    handleSubmit,
    errors,
    error,
    isLoading,
    showPassword,
    dniInputRef,
    passwordInputRef,
    randomDniName,
    randomPasswordName,
    onSubmit,
    handleClickShowPassword,
  };
};

export default useLoginForm;

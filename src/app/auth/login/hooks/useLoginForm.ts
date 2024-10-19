import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export type LoginFormData = {
  dni: string;
  password: string;
};

const useLoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const dniInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dniInputRef.current) dniInputRef.current.readOnly = false;
    if (passwordInputRef.current) passwordInputRef.current.readOnly = false;
  }, []);

  const onSubmit = async (data: LoginFormData) => {
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

  return {
    control,
    handleSubmit,
    errors,
    error,
    isLoading,
    dniInputRef,
    passwordInputRef,
    onSubmit,
    formValue: FormData,
  };
};

export { useLoginForm };

'use client';

import React, {useState} from 'react';
import FormField from './FormFiled';
import Link from 'next/link';
import {AuthFormData} from "@/types";
import {VscCloudUpload} from "react-icons/vsc";
import {useAuthAPI} from "@/hook/useAuthAPI";
import {toast} from "react-hot-toast";
import {AxiosError} from "axios";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {FcGoogle} from "react-icons/fc";
import {FaEye, FaEyeSlash} from "react-icons/fa";

interface AuthFormProps {
    type: 'sign-in' | 'sign-up';
    onSubmit?: (form: AuthFormData) => void;
}

export default function AuthForm({type}: AuthFormProps) {
    const isSignUp = type === 'sign-up';

    const [form, setForm] = useState<AuthFormData>({
        fullName: '',
        email: '',
        password: '',
        image: null as File | null,
        imagePreview: ''
    });
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const {useCreateUser} = useAuthAPI();
    const createUser = useCreateUser();

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm((prev) => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file),
            }));
        }
    }

    const handleLogin = async (email: string, password: string) => {
        setIsLoggingIn(true);
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (res?.ok) {
                router.push('/');
            } else if (res?.status === 401) {
                toast.error('نام کاربری یا رمز عبور اشتباه است.');
            } else {
                toast.error('مشکلی پیش آمده است.');
            }
        } catch {
            toast.error("مشکلی در ورود پیش آمده است.");
        } finally {
            setIsLoggingIn(false);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (key !== 'imagePreview' && value !== null) {
                formData.append(key, value);
            }
        })

        if (isSignUp) {
            try {
                await createUser.mutateAsync(formData)
                toast.success("با موفقیت ثبت نام شده اید.")

                await handleLogin(form.email, form.password);
            } catch (error) {
                const err = error as AxiosError<{ error?: string }>;
                const message = err.response?.data?.error || 'خطایی رخ داده است.';
                toast.error(message)
            }
        } else {
            await handleLogin(form.email, form.password);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-2 mb-4">
                <h1 className="font-semibold text-xl">
                    {isSignUp ? 'ساخت اکانت در سایت ما.' : 'به سایت ما خوش برگشتی.'}
                </h1>
                <p className="text-[#D6E0FF]">
                    {isSignUp
                        ? 'لطفاً برای ساخت اکانت تمام فیلدها را کامل کنید.'
                        : 'به مجموعه گسترده‌ای از منابع دسترسی پیدا کنید.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                {isSignUp && (
                    <FormField
                        label="نام کامل"
                        name="fullName"
                        placeholder="نام کامل..."
                        value={form.fullName!}
                        onChange={handleChange}
                    />
                )}

                <FormField
                    label="ایمیل"
                    name="email"
                    placeholder="ایمیل..."
                    value={form.email}
                    onChange={handleChange}
                />

                <div className="relative">
                    <FormField
                        label="رمز عبور"
                        name="password"
                        placeholder="رمز عبور..."
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute left-3 bottom-3 mx-auto text-gray-200 hover:text-white"
                    >
                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                    </button>
                </div>

                {isSignUp && (
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm" htmlFor="image">عکس پروفایل (اختیاری)</label>
                        <div
                            className="flex items-center justify-center w-full h-16 rounded-sm bg-[#232839] cursor-pointer"
                            onClick={() => document.getElementById('image')?.click()}
                        >
                            {form.imagePreview ? (
                                <img
                                    src={form.imagePreview}
                                    alt="preview"
                                    className="w-20 h-14 object-contain"
                                />
                            ) : (
                                <div className="flex items-center gap-x-2 text-sm text-gray-200 justify-center w-full">
                                    آپلود عکس
                                    <VscCloudUpload className="text-3xl"/>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                id="image"
                                className="hidden"
                                onChange={handleImage}
                            />
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={(isSignUp && createUser.isPending) || (!isSignUp && isLoggingIn)}
                    className="primary-button w-full !py-2 disabled:opacity-50 mt-2"
                >
                    {(isSignUp && createUser.isPending) || (!isSignUp && isLoggingIn)
                        ? isSignUp
                            ? 'ثبت‌نام در حال انجام...'
                            : 'در حال ورود...'
                        : isSignUp
                            ? 'ثبت‌نام'
                            : 'ورود'}
                </button>

                <button
                    type="button"
                    onClick={() => signIn('google', {callbackUrl: '/'})}
                    className="flex items-center justify-center gap-x-2 w-full py-2 mt-1 text-sm rounded-md border border-gray-400 text-gray-200 hover:bg-gray-800 transition"
                >
                    <FcGoogle/>
                    ورود با گوگل
                </button>

                <p className="text-sm text-gray-300">
                    {isSignUp ? 'دارای اکانت هستید؟' : 'هنوز اکانت نساخته‌اید؟'}{' '}
                    <Link
                        href={isSignUp ? '/sign-in' : '/sign-up'}
                        className="text-primary font-semibold hover:underline"
                    >
                        {isSignUp ? 'ورود' : 'ثبت‌نام'}
                    </Link>
                </p>
            </form>
        </>
    );
}

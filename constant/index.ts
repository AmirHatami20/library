import {IoHomeOutline} from "react-icons/io5";
import {LuBookText, LuUsers} from "react-icons/lu";
import {FaRegMoneyBillAlt} from "react-icons/fa";
import {TbCategory} from "react-icons/tb";

export const adminSideBarLinks = [
    {
        Icon: IoHomeOutline,
        route: "/admin",
        text: "صفحه اصلی",
    },
    {
        Icon: LuBookText,
        route: "/admin/book",
        text: "کتاب ها",
    },
    {
        Icon: TbCategory,
        route: "/admin/genre",
        text: "ژانر ها",
    },
    {
        Icon: LuUsers,
        route: "/admin/user",
        text: "کاربران",
    },
    {
        Icon: FaRegMoneyBillAlt,
        route: "/admin/sale",
        text: "کتاب خریداری شده",
    },

];

export const adminStats = [
    {label: 'مجموع کتاب ها', value: 20, percent: 5},
    {label: 'مجموع کاربران', value: 100, percent: -1},
    {label: 'تعداد فروش', value: 55, percent: 10},
]

export const users = [
    {fullName: "امیر رضا حاتمی", email: "admin@gmail.com"},
    {fullName: "حسین رحتمی", email: "hosersns1212@gmail.com"},
    {fullName: "علی زمانیان", email: "ali123anaza@gmail.com"},
    {fullName: "مهدی اسدی", email: "mehdi0asadi@gmail.com"},
    {fullName: "محمدرضا نصیری", email: "mohamaadnasieri@gmail.com"},
    {fullName: "احسان خواجه امیری", email: "bahmai1232@gmail.com"},
]

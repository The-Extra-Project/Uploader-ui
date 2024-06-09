import Link from "next/link"
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import {Button} from "@/components/ButtonShadcn"
import React, {useState} from "react"
import idf from "@/app/public/region_ile_de_france_image.png"
import Image from "next/image"
import {Avatar, AvatarFallback} from "@/components/avatarImage"
import extra from "@/app/public/extra_logo.png"
import {ArrowDownward} from "@mui/icons-material"


export default function HeaderApplication() {
    return (
    <header className="flex items-center justify-between bg-green-100 px-4 py-3 text-white md:px-6">
    <Link href="page" className="flex items-center">        
    <span className="ml-2 text-lg font-medium text-black">Uploader App</span>
    </Link>
    <Image src={idf} height={100} width={100} alt="IDF"></Image>
    <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 lm ">
            <Avatar className="h-8 w-8">
                <Image src={extra} alt="User Avatar" />
                <AvatarFallback >DM</AvatarFallback>
            </Avatar>    
            <span className="text-sm font-medium text-black">Dhruv Malik</span>
            <ArrowDownward />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-black">
            <DropdownMenuItem  > 
            <Link href="/app/dashboard-user">
        Profile
    </Link>
         </DropdownMenuItem>
            <DropdownMenuItem > Settings  </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem> Logout </DropdownMenuItem>
            </DropdownMenuContent>
    </DropdownMenu>
    </header>
    );
}
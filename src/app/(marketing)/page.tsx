"use client"
import React from "react";
import Image from "next/image";
import Button from "@mui/material";
import {Button as MUILink} from '@mui/material'
import Link from "next/link";
import NextLink from "next/link";
import extra from "@/app/public/extra_logo.png" 
import helsinki from "@/app/public/helsinki_map_project.png"
import { Input } from "@mui/base";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Image
              src={extra}
              width={100}
              height={100}
              alt="logo"
            />
            <Image 
              src={helsinki}
              width={100}
              height={100}
              alt="params"
            />
          </div>
          <p className="mt-6 text-sm text-gray-600">
            Bienvenue sur le projet Circum pour Ile-de-France!
            <br />
            Nous construisons de meilleures cartes 3D en rémunérant les
            entreprises et les citoyens qui partagent des données. Découvre-en
            plus
            <Link className="text-green-600" href="https://www.extralabs.xyz/terms-of-use-extra-uploader">
              ici
            </Link>
            .{"\n"}
          </p>
        </div>
        <div className="mt-8 w-full max-w-xs">
          <form className="flex flex-col space-y-4">
            <Input placeholder="Adresse email" type="email" />
            <Input placeholder="Mot de passe" type="password" />
            <NextLink href="/" passHref>
              <MUILink>Login</MUILink>
            </NextLink>
            
            
            {/* <Button
              variant="contained"
              onClick={() => (window.location.href = "/dashboard")}
            > */}
              {/* Connexion */}
            {/* </Button> */}
          </form>
          <div className="mt-4 text-center">
            <Link className="text-sm text-green-50" href="#">
              Mot de passe oublié ?
            </Link>
            <br />
            <Link className="text-sm text-gray-600 mt-2" href="#">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

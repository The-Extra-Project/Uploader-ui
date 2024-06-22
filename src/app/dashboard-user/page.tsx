"use client";

import HeaderApplication from "@/components/HeaderApplication";
import { Metadata } from "next";
import { Button } from "@/components/ButtonShadcn";
import { Tabs } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import {LatestEvals} from "@/components/userStats"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// integrate the API endpoint for setting up the database at the backend
interface latestEvalProps {
  userName: string
  currentValue: string
  lastFile: string
  filesName: string[]
}

export default function UserDashboard() {
  const router = useRouter()

  const [latestEval, setLatestEval] = useState<latestEvalProps>({
    userName: "",
    currentValue: "",
    lastFile: "",
    filesName: [],
  });

  useEffect(() => {
    setUserStats();
  }, []) 
  const setUserStats = async () => {
    const request = await fetch("/api/user/dashboard")
    try {
      if (request)
        {
          setLatestEval({
            userName: request.json()["username"],
            currentValue: request.json()["current_value"],
            lastFile: request.json()["current_file"],
            filesName: request.json()["all_files"]
          })
        }
    }
    catch(error)
    {
      console.error("err in setting user statistics: not a correct param")
    }
    // create API for uploading the file data
    
  }
  return (
    <>
      <HeaderApplication />
    <div className="flex items-center justify-between space-y-2">
    <h2 className="text-2xl font-bold text-black">Hi {latestEval.userName}, Your Dashboard</h2>
    </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Tabs defaultValue="overview" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total tokens received
              </CardTitle>
            </CardHeader>
            <CardContent>  {latestEval.currentValue} Mapload</CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Files Uploaded
              </CardTitle>
            </CardHeader>
            <CardContent>{latestEval.filesName}</CardContent>
          </Card>
        </Tabs>

        <Tabs>
          <Card>
            <CardHeader>
              <CardTitle>Your recent uploads</CardTitle>
            </CardHeader>
            <CardContent>
              {latestEval.filesName}
            </CardContent>
          </Card>
          <Card>
            <CardTitle>Connecting to the wallet account</CardTitle>
            <CardContent>
              <Button>Connect wallet account</Button>
            </CardContent>
          </Card>
        </Tabs>
        <Card>
        <CardTitle>  Uploading the dataset for evaluation </CardTitle>
        <CardContent className="flex-center">
              <Button onClick={() => router.push("/data-upload")}>Upload file </Button>
            </CardContent>
        </Card>
      </div>
    </>
  );
}

"use client"


import HeaderApplication from "@/components/HeaderApplication"
import { Metadata } from "next"
import {
    Tabs,
    TabsContent,
    TabsList
} from "@/components/ui/tabs"

import {LatestEvals} from "@/components/latest_evals"
import { Card , CardHeader, CardTitle, CardContent} from "@/components/Card"

import {useWalletAuth, ConnectWallet} from "@/components/abstractWalletOps"




// export const metadata: Metadata = {
// title: "user contribution dashboard",
// description: "user gets the overall information regarding their contribution on uploader platform"
// }

// TODO: define the current descriptions of the mapload token values
export default function UserDashboard() {

    const { isConnecting, isConnected, connect, connectionStatus, wallet } =
      useWalletAuth();
      


    return (
    <>
    <HeaderApplication/>
    <div className= "grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Tabs defaultValue="overview" className="space-y-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                      Total tokens received
            </CardTitle>
            </CardHeader>
            <CardContent>
            1000 Mapload
            </CardContent> 
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                      Files Uploaded
            </CardTitle>
            </CardHeader>
            <CardContent>
            10
            </CardContent> 
        </Card>
        </Tabs>

        <Tabs>
        <Card>
            <CardHeader>
                <CardTitle>Your recent uploads</CardTitle>
            </CardHeader>
        <CardContent>
            <LatestEvals/>
        </CardContent>
        </Card>
        <Card>
        <CardTitle>
          Connecting to the wallet account
        </CardTitle>
  
        <CardContent>
  
        <ConnectWallet
                  isConnected={isConnected}
                  isConnecting={isConnecting}
                  connect={connect}
                  ConnectionStatus={connectionStatus}
                  wallet={wallet}
                />
        </CardContent>
  
      </Card>

        </Tabs>
    </div>    
    
    </>

);
}



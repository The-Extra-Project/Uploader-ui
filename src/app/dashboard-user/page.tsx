"use client";

import HeaderApplication from "@/components/HeaderApplication";
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";

// integrate the API endpoint for setting up the database at the backend
interface latestEvalProps {
  currentValue: string;
  fileName: string;
}

function LatestEvals(): JSX.Element {
  return (
    <>
      <CardHeader>
        Filename:
        <span></span>
      </CardHeader>
      <CardContent>
        <h2 className="text-large text-bold text-muted-foreground font-dark">
          total mapLoad tokens:
          <span></span>
        </h2>
      </CardContent>
    </>
  );
}

import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";

//import {useWalletAuth, ConnectWallet} from "@/components/abstractWalletOps"
import { Button } from "@/components/ButtonShadcn";

const getCurrentValue = (current_value): JSX.Element => {
  return <div> {current_value} </div>;
};

const getLastUploadedFile: React.FC<string> = (
  lastFileUpdated,
): JSX.Element => {
  return <div> {lastFileUpdated} </div>;
};

// TODO: define the current descriptions of the mapload token values
export default function UserDashboard() {
  // const { isConnecting, isConnected, connect, connectionStatus, wallet } =
  //   useWalletAuth();
  return (
    <>
      <HeaderApplication />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Tabs defaultValue="overview" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total tokens received
              </CardTitle>
            </CardHeader>
            <CardContent>1000 Mapload</CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Files Uploaded
              </CardTitle>
            </CardHeader>
            <CardContent>10</CardContent>
          </Card>
        </Tabs>

        <Tabs>
          <Card>
            <CardHeader>
              <CardTitle>Your recent uploads</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          <Card>
            <CardTitle>Connecting to the wallet account</CardTitle>

            <CardContent>
              <Button>Connect wallet account</Button>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </>
  );
}

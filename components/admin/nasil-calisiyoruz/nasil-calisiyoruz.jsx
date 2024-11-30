"use client";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import BaslikveAciklama from "./baslik-ve-aciklama";
import CalismaAdimlari from './calisma-adimlari'

function NasilCalisiyoruz() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="pl-2 pr-5 overflow-hidden">
        <BaslikveAciklama />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel  className="pl-2 pr-5 overflow-hidden">
        <CalismaAdimlari />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default NasilCalisiyoruz;

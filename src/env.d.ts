/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type D1Database = import('@cloudflare/workers-types').D1Database;

interface Runtime {
  env: {
    DB: D1Database;
    PROTEIN_TARGET: string;
    WATER_TARGET_LITERS: string;
  };
}

declare namespace App {
  interface Locals {
    runtime: Runtime;
  }
}

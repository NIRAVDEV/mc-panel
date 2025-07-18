
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if any nodes are using this location
    const nodes = await prisma.node.count({ where: { locationId: params.id }});
    if (nodes > 0) {
        return NextResponse.json({ error: "Cannot delete location as it is currently in use by one or more nodes." }, { status: 400 });
    }
    
    await prisma.location.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.code === 'P2025') { // Prisma's record not found error
        return NextResponse.json({ error: "Location not found." }, { status: 404 });
    }
    console.error(err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

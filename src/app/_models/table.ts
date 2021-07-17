import * as d3 from 'd3';
import {TAB} from "@angular/cdk/keycodes";

export interface TableInterface {
  id: number;
  number: number;
  position_left: number;
  position_top: number;
  rotation: number;
  status: number;
  type: number;
}

export enum TableStatus {
  OPEN = 0,
  RESERVED = 1,
  PENDING = 2
}

export enum TableType {
  CIRCLE = 1,
  RECT = 2,
  TRAPEZOID = 3,
  MALI= 4
}

export const TableTypeMapping = [
  { value: TableType.CIRCLE, type: 'Circle'},
  { value: TableType.RECT, type: 'Rectangle'},
  { value: TableType.TRAPEZOID, type: 'Trapezoid'},
  { value: TableType.MALI, type: 'Smaller Rectangle'},
]

export enum TableColor {
  OPEN = 'rgba(105,163,178,1)',
  RESERVED = 'rgba(255,113,0,1)',
  PENDING = 'rgba(255,236,53,1)'
}

export enum TableShape {
  RECT = 'rect',
  CIRCLE = 'circle',
  TRAPEZOID = 'polygon',
  MALI = 'rect'
}

export class Table {
  id: number;
  number: number;
  x: number;
  y: number;
  rotation: number;
  status: TableStatus;
  type: TableType;

  constructor(table: TableInterface) {
    this.id = table.id;
    this.number = table.number;
    this.x = table.position_left;
    this.y = table.position_top;
    this.rotation = table.rotation;

    switch (table.status) {
      case 0: {
        this.status = TableStatus.OPEN;
        break;
      }
      case 1: {
        this.status = TableStatus.RESERVED;
        break;
      }
      case 2: {
        this.status = TableStatus.PENDING;
        break;
      }
      default: {
        this.status = TableStatus.PENDING;
      }
    }

    switch (table.type) {
      case TableType.CIRCLE.valueOf(): {
        this.type = TableType.CIRCLE;
        break;
      }
      case TableType.RECT.valueOf(): {
        this.type = TableType.RECT;
        break;
      }
      case TableType.TRAPEZOID.valueOf(): {
        this.type = TableType.TRAPEZOID;
        break;
      }
      case TableType.MALI.valueOf(): {
        this.type = TableType.MALI;
        break;
      }
      default: {
        this.type = TableType.CIRCLE;
      }
    }
  }

  get color(): TableColor {
    switch (this.status) {
      case TableStatus.OPEN:
        return TableColor.OPEN
      case TableStatus.RESERVED:
        return TableColor.RESERVED
      case TableStatus.PENDING:
        return TableColor.PENDING
    }
  }

  get shape(): TableShape {
    switch (this.type) {
      case TableType.RECT:
        return TableShape.RECT
      case TableType.CIRCLE:
        return TableShape.CIRCLE
      case TableType.TRAPEZOID:
        return TableShape.TRAPEZOID
      case TableType.MALI:
        return TableShape.MALI
    }
  }
}

export class TableEventHolder {
  tables: Table[];
  event: string | null;

  constructor(tables: Table[], event: string | null) {
    this.tables = tables;
    this.event = event;
  }
}

interface TableReferenceInterface {
  g: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  table: Table;
}

export class TableReference {
  g: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  table: Table;

  constructor(table: TableReferenceInterface) {
    this.g = table.g;
    this.table = table.table;
  }
}

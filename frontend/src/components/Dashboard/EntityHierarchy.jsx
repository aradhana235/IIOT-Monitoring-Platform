import React, { useState } from "react";

const TREE = [
  {
    id: "demo",
    label: "demo alphacore sub-customer",
    count: 3,
    children: [
      { id: "demo-1", label: "Boiler Feed Line/2001" },
      { id: "demo-2", label: "Condensate Trap/2002" },
      { id: "demo-3", label: "Header Trap/2003" },
    ],
  },
  {
    id: "bkt",
    label: "user grp for bkt",
    count: 4,
    children: [
      { id: "bkt-1", label: "Mixing Mill Trap/3001" },
      { id: "bkt-2", label: "Curing Press Trap/3002" },
      { id: "bkt-3", label: "Extruder Line/3003" },
      { id: "bkt-4", label: "Autoclave Trap/3004" },
    ],
  },
  {
    id: "mrf",
    label: "mrf tyre",
    count: 5,
    children: [
      { id: "mrf-1", label: "Vulcanizer 1/4001" },
      { id: "mrf-2", label: "Vulcanizer 2/4002" },
      { id: "mrf-3", label: "Steam Header A/4003" },
      { id: "mrf-4", label: "Steam Header B/4004" },
      { id: "mrf-5", label: "Return Line/4005" },
    ],
  },
  {
    id: "marico",
    label: "marico",
    count: 4,
    children: [
      { id: "marico-1", label: "Refinery Line 1/5001" },
      { id: "marico-2", label: "Refinery Line 2/5002" },
      { id: "marico-3", label: "Packing Steam/5003" },
      { id: "marico-4", label: "Boiler House/5004" },
    ],
  },
  {
    id: "apollo",
    label: "apollo",
    count: 31,
    children: [
      { id: "ap-1", label: "MCB TCP 903 RHS Platen trap/1055" },
      { id: "ap-2", label: "Row 13 Extension b/h TCP 9399/1056" },
      { id: "ap-3", label: "Mould shop Area/1047" },
      { id: "ap-4", label: "MCB TCP 903 LHS Platen Trap/1043" },
      { id: "ap-5", label: "Row 12 Behind Press 9295 HP/1042" },
      { id: "ap-6", label: "Row 13 Behind Press 9315 HP/1046" },
      { id: "ap-7", label: "Curing mexanine Behind Panel/1050" },
      { id: "ap-8", label: "Row 14 Behine Press 9362 HP/1053" },
      { id: "ap-9", label: "Row 11 Behind Press 9293 HP/1051" },
      { id: "ap-10", label: "Row 11 Behind Press 9314 HP/1045" },
    ],
  },
];

function FolderIcon() {
  return (
    <svg className="entity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3v18M6 3h9l-2 4 2 4H6" />
    </svg>
  );
}

function CaretIcon({ expanded }) {
  return (
    <svg className={`entity-caret ${expanded ? "expanded" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export default function EntityHierarchy({ onSelect }) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState({ apollo: true });
  const [active, setActive] = useState("apollo");

  const toggle = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const query = search.trim().toLowerCase();
  const nodes = TREE.filter((n) => !query || n.label.toLowerCase().includes(query));

  return (
  <div className="entity-hierarchy">

    {/* Heading */}
    <div className="entity-header">
      <h3>Entities Hierarchy</h3>
      <p>Select Customer / Device</p>
    </div>

    {/* Search */}
    <div className="entity-search">
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    <div className="entity-tree">
      {nodes.map((node) => {
        const isExpanded = !!expanded[node.id];
        const hasChildren = node.children && node.children.length > 0;

        return (
          <div key={node.id}>
            <div
              className={`entity-node-row ${
                active === node.id ? "active" : ""
              }`}
              onClick={() => {
                setActive(node.id);

                if (hasChildren) toggle(node.id);

                onSelect && onSelect(node);
              }}
            >
              {hasChildren ? (
                <CaretIcon expanded={isExpanded} />
              ) : (
                <span style={{ width: 14 }} />
              )}

              <FolderIcon />

              <span className="entity-label">{node.label}</span>

              {node.count !== null && (
                <span className="entity-count">
                  {node.count}
                </span>
              )}
            </div>

            {hasChildren && isExpanded && (
              <div className="entity-children">
                {node.children.map((leaf) => (
                  <div
                    key={leaf.id}
                    className="entity-leaf"
                    onClick={() => onSelect && onSelect(leaf)}
                  >
                    <LeafIcon />
                    <span>{leaf.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>

  </div>
);
}

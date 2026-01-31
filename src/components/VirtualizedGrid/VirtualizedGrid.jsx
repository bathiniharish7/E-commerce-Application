import React from "react";
import { VirtuosoGrid } from "react-virtuoso";

const VirtualizedGrid = ({ data, renderItem }) => {
  return (
    <div style={{ flexGrow:1,minHeight:0 }}>
      <VirtuosoGrid
        data={data}
        overscan={500}
        itemContent={(index, item) =>
          renderItem(item, index)
        }
        components={{
          List: React.forwardRef(
            ({ style, children }, ref) => (
              <div
                ref={ref}
                style={{
                  ...style,
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "16px",
                  padding: "12px",
                }}
              >
                {children}
              </div>
            )
          ),

          Item: ({ children, ...props }) => (
            <div {...props} style={{ height: "auto" }}>
              {children}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default VirtualizedGrid;

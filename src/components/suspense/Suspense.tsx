import { Suspense } from "react";
import { Circles } from "react-loader-spinner";
// import { PropagateLoader } from "react-spinners";

// TYPES
type Props = { children: any };

// SUSPENSE COMPONENT
export default function SuspenseComponent({ children }: Props) {
  return (
    <Suspense
      fallback={
        <Circles
          height="50"
          width="50"
          color="black"
          ariaLabel="circles-loading"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            height: "100vh",
            paddingTop: "100px",
          }}
          wrapperClass="loader"
          visible={true}
        />
      }
    >
      {children}
    </Suspense>
  );
}

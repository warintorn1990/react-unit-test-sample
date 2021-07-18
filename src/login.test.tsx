import { Login } from "./login";
import * as ReactDOM from "react-dom";
import {
  fireEvent,
  waitFor,
  waitForElement,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { LoginService } from "./services/LoginService";

describe("Login Component test", () => {
  let container: HTMLDivElement;
  const loginServiceSpy = jest.spyOn(LoginService.prototype, "login");

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<Login />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("Renders correct initial document", () => {
    const inputs = container.querySelectorAll("input");
    expect(inputs).toHaveLength(3);
    expect(inputs[0].name).toBe("login");
    expect(inputs[1].name).toBe("password");
    expect(inputs[2].value).toBe("Login");

    const lable = container.querySelector("lable");
    expect(lable).not.toBeInTheDocument();
  });

  it("Renders correct initial document with data-test query", () => {
    expect(
      container.querySelector("[data-test='login-form']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-test='login-input']")?.getAttribute("name")
    ).toBe("login");
    expect(
      container
        .querySelector("[data-test='password-input']")
        ?.getAttribute("name")
    ).toBe("password");
  });

  it("pass credential currectly", () => {
    const inputs = container.querySelectorAll("input");
    const loginInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];
    fireEvent.change(loginInput, { target: { value: "someUser" } });
    fireEvent.change(passwordInput, { target: { value: "somePass" } });
    fireEvent.click(loginButton);
    expect(loginServiceSpy).toBeCalledWith("someUser", "somePass");
  });

  //   it("Renders correctly status lable - invalid login", async () => {
  //     loginServiceSpy.mockResolvedValueOnce(false);
  //     const inputs = container.querySelectorAll("input");
  //     const loginButton = inputs[2];
  //     fireEvent.click(loginButton);
  //     const statusLable = await waitFor(() =>
  //         container.querySelector("label")
  //     );
  //     // console.log(statuslable);
  //     // expect(statusLable).toBeInTheDocument();
  //     expect(statusLable).toHaveTextContent('Login failed');
  //   });

  it("Renders correctly status label - invalid login", async () => {
    loginServiceSpy.mockResolvedValueOnce(true);
    const inputs = container.querySelectorAll("input");
    const loginButton = inputs[2];
    fireEvent.click(loginButton);
    const statusLabel = await waitFor(() =>
      container.querySelector("label")
    )
    // expect(statusLabel).toBeInTheDocument();
    // expect(statusLabel).toHaveTextContent("Login successful");
  });
});

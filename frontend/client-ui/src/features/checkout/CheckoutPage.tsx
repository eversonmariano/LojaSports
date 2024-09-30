import { Box, Button, Paper, Step, StepLabel, Stepper, Typography, } from "@mui/material";
  import { useState } from "react";
  import AddressForm from "./AddressForm";
  import PaymentForm from "./PaymentForm";
  import Review from "./Review";
  import { FieldValues, FormProvider, useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { Cartt, CartItem } from "../../app/models/cart";
  import { toast } from "react-toastify";
  import agent from "../../app/api/agent";
  import { useAppDispatch } from "../../app/store/configureStores";
  import { setCart } from "../cart/cartSlice";
  import { ValidationRules } from "./ValidationRules";
  
  
  const steps = ["Endereço de Entrega", "Revise Seu Pedido", "Detalhes de Pagamento"];
  
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <Review />;
      case 2:
        return <PaymentForm />;
      default:
        throw new Error("Unknown step");
    }
  }
  
  export default function CheckoutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [orderNumber, setOrderNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const currentValdationRule = ValidationRules[activeStep];
    const methods = useForm({
      mode: "all",
      resolver: yupResolver(currentValdationRule),
    }); // Initialize useForm
    const dispatch = useAppDispatch();
    const handleNext = async () => {
      // Trigger form validation
      const isValid = await methods.trigger();
  
      if (isValid) {
        // Log form data before moving to the next step
        //console.log(methods.getValues());
        const data: any = methods.getValues();
        console.log(data);
        if (activeStep === steps.length - 1) {
          // If it's the last step, submit the order
          const cart = await agent.Cart.get();
          if (cart) {
            const subTotal = calculateSubTotal(cart.items);
  
            // Add logic to calculate delivery fee
            const deliveryFee = 150;
  
            try {
              setLoading(true);
              // Construct the order DTO to send to the backend
              const orderDto = {
                cartId: cart.id,
                shippingAddress: {
                name: data.firstName + " " + data.lastName,
                address1: data.address1,
                address2: data.address2,
                city: data.city,
                state: data.state,
                zipCode: data.zip,
                country: data.country,
                },
                subTotal: subTotal,
                deliveryFee: deliveryFee              
              };
  
              // Call the API to create the order
              const orderId = await agent.Orders.create(orderDto);
              // Order created successfully
              setOrderNumber(orderId); 
              setActiveStep(activeStep + 1); // Move to the next step           
              //now clear the cart from api 
              agent.Cart.deleteCart(cart.id);
              dispatch(setCart(null));
              //and also clear the cart from local storage
              localStorage.removeItem('cart_id');
              localStorage.removeItem('cart');                 
            } catch (error) {
              // Handle API call errors
              console.error("Erro ao enviar o pedido:", error);
              toast.error("Falha ao enviar o pedido. Tente novamente.");
            } finally {
              setLoading(false);
            }
          } else {
            console.error("Carrinho não encontrado no armazenamento local");
          }
        } else {
          // Move to the next step if it's not the last step
          setActiveStep(activeStep + 1);
        }
      }
    };
  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };
  
    const calculateSubTotal = (items: CartItem[]): number => {
      return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };
  
    return (
      <FormProvider {...methods}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Confira Seu(s) Pedido(s)
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                Obrigado pela Preferência! =D
                </Typography>
                <Typography variant="subtitle1">
                  Número do Pedido #{orderNumber}. Enviamos a confirmação do seu pedido por e-mail e lhe enviaremos uma atualização quando seu pedido for enviado.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Voltar
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Fazer pedido" : "Proximo"}
                  </Button>
                </Box>
              </>
            )}
          </>
        </Paper>
      </FormProvider>
    );
  }
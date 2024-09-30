import { Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form"

export default function PaymentForm(){
    const {register, formState:{errors}} = useFormContext();
    return (
        <>
        <Typography variant="h6" gutterBottom>
            Forma de Pagamento 
        </Typography>
        <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
           // required
            id="cardName"
            {...register("cardName")}
            label="Nome no cartão"
            helperText="Nome completo como aparece no cartão"

            fullWidth
            autoComplete="cc-name"
            variant="standard"
            error={!!errors.cardName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
          //  required
            id="cardNumber"
            {...register("cardNumber")}
            label="Número do cartão"
            helperText="Digite o número do cartão"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            error={!!errors.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
           // required
            id="expDate"
            {...register("expDate")}
            label="Validade do Cartão"
            helperText="Validade do cartão"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            error={!!errors.expDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            //required
            id="cvv"
            {...register("cvv")}
            label="CVV"
            helperText="Código de Segurança"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            error={!!errors.cvv}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Lembre-se dos detalhes do cartão para a próxima compra."
          />
        </Grid>
      </Grid>
      </form>
        </>

    )
}
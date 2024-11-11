import { motion } from "framer-motion"

interface Props {
  children: React.ReactNode;
}
export const FadeIn: React.FC<Props> = ({ children }) => {
  return (<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}>
    {children}
  </motion.div>)
}